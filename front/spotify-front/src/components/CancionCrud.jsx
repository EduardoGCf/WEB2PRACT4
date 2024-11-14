import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function CancionCrud() {
  const [canciones, setCanciones] = useState([]);
  const [albunes, setAlbunes] = useState([]);
  const [newCancion, setNewCancion] = useState({ nombre: '', imagen: '', cancion_mp3: '', id_albun: '' });
  const [selectedCancion, setSelectedCancion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCanciones();
    fetchAlbunes();
  }, []);

  const fetchCanciones = () => {
    axios
      .get('http://127.0.0.1:3000/canciones')
      .then(response => setCanciones(response.data))
      .catch(error => console.error('Error al cargar las canciones:', error));
  };

  const fetchAlbunes = () => {
    axios
      .get('http://127.0.0.1:3000/albunes')
      .then(response => setAlbunes(response.data))
      .catch(error => console.error('Error al cargar los álbumes:', error));
  };

  const handleCreate = () => {
    const formData = new FormData();
    formData.append('nombre', newCancion.nombre);
    formData.append('id_albun', newCancion.id_albun);
    formData.append('files', newCancion.imagen);
    formData.append('files', newCancion.cancion_mp3);
  
    axios.post('http://127.0.0.1:3000/canciones', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
      fetchCanciones();
      setNewCancion({ nombre: '', imagen: '', cancion_mp3: '', id_albun: '' });
    })
    .catch((error) => console.error('Error al crear la canción:', error));
  };

  
  const handleEdit = () => {
    if (!selectedCancion || !selectedCancion.id) {
        console.error('No hay canción seleccionada para actualizar');
        return;
    }

    const formData = new FormData();
    formData.append('nombre', selectedCancion.nombre || '');
    formData.append('id_albun', selectedCancion.id_albun || '');

    if (selectedCancion.imagen instanceof File) {
        formData.append('imagen', selectedCancion.imagen);
    }

    if (selectedCancion.cancion_mp3 instanceof File) {
        formData.append('cancion_mp3', selectedCancion.cancion_mp3);
    }

    axios
        .patch(`http://127.0.0.1:3000/canciones/${selectedCancion.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
            console.log('Canción actualizada:', response.data);
            setShowModal(false);
            fetchCanciones();
        })
        .catch(err => {
            console.error('Error al editar la canción:', err);
        });
};


  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/canciones/${id}`)
      .then(() => fetchCanciones())
      .catch(error => console.error('Error al eliminar la canción:', error));
  };



  return (
    <div>
      <h2>Canciones</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre de la canción"
          value={newCancion.nombre}
          onChange={(e) => setNewCancion({ ...newCancion, nombre: e.target.value })}
          className="form-control mb-2"
        />
        <select
          className="form-control mb-2"
          value={newCancion.id_albun}
          onChange={(e) => setNewCancion({ ...newCancion, id_albun: e.target.value })}
        >
          <option value="">Seleccionar Álbum</option>
          {albunes.map((albun) => (
            <option key={albun.id} value={albun.id}>
              {albun.nombre}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setNewCancion({ ...newCancion, imagen: e.target.files[0] })}
          className="form-control mb-2"
          placeholder="Seleccionar imagen"
        />
        <input
          type="file"
          onChange={(e) => setNewCancion({ ...newCancion, cancion_mp3: e.target.files[0] })}
          className="form-control mb-2"
          placeholder="Subir archivo MP3"
        />
        <button className="btn btn-success" onClick={handleCreate}>
          Agregar Canción
        </button>
      </div>
      <ul className="list-group">
  {canciones.map((cancion) => (
    <li
      key={cancion.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <div>
        <img
          src={cancion.imagen}
          alt={cancion.nombre}
          style={{ width: 150, marginRight: 10 }}
        />
        <strong>Canción:</strong> {cancion.nombre}
          <br />
          <strong>Álbum:</strong> {cancion.albun?.nombre}
          <br />
        <div>
          <audio controls style={{ marginTop: 10, width: '100%' }}>
            <source src={`http://127.0.0.1:3000/uploads/${cancion.cancion_mp3}`} type="audio/mp3" />
            Tu navegador no soporta el reproductor de audio.
          </audio>
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary me-2"
          onClick={() => {
            setSelectedCancion(cancion);
            setShowModal(true);
          }}
        >
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(cancion.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  ))}
</ul>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Canción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nombre de la canción"
            value={selectedCancion?.nombre || ''}
            onChange={(e) =>
              setSelectedCancion({ ...selectedCancion, nombre: e.target.value })
            }
            className="form-control mb-2"
          />
          <select
            className="form-control mb-2"
            value={selectedCancion?.id_albun || ''}
            onChange={(e) =>
              setSelectedCancion({ ...selectedCancion, id_albun: e.target.value })
            }
          >
            <option value="">Seleccionar Álbum</option>
            {albunes.map((albun) => (
              <option key={albun.id} value={albun.id}>
                {albun.nombre}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) =>
              setSelectedCancion({ ...selectedCancion, imagen: e.target.files[0] })
            }
            className="form-control mb-2"
          />
          <input
            type="file"
            onChange={(e) =>
              setSelectedCancion({ ...selectedCancion, cancion_mp3: e.target.files[0] })
            }
            className="form-control mb-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CancionCrud;
