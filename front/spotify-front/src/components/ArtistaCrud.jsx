import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function ArtistaCrud() {
  const [artistas, setArtistas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [newArtista, setNewArtista] = useState({ nombre: '', imagen: '', id_genero: '' });
  const [selectedArtista, setSelectedArtista] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchArtistas();
    fetchGeneros();
  }, []);

  const fetchArtistas = () => {
    axios
      .get('http://127.0.0.1:3000/artistas')
      .then(response => setArtistas(response.data))
      .catch(error => console.error('Error al cargar los artistas:', error));
  };

  const fetchGeneros = () => {
    axios
      .get('http://127.0.0.1:3000/genero')
      .then(response => setGeneros(response.data))
      .catch(error => console.error('Error al cargar los géneros:', error));
  };

  const handleCreate = () => {
    if (!newArtista.nombre || !newArtista.imagen || !newArtista.id_genero) {
      alert('Por favor complete todos los campos');
      return;
    }
    const formData = new FormData();
    formData.append('nombre', newArtista.nombre);
    formData.append('id_genero', newArtista.id_genero);
    formData.append('imagen', newArtista.imagen);
  
    axios
      .post('http://127.0.0.1:3000/artistas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        fetchArtistas();
        setNewArtista({ nombre: '', id_genero: '', imagen: '' });
      })
      .catch((error) => console.error('Error al crear el artista:', error));
  };
  

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/artistas/${id}`)
      .then(() => fetchArtistas())
      .catch(error => console.error('Error al eliminar el artista:', error));
  };
  



  const handleEdit = () => {
    if (!selectedArtista || !selectedArtista.id) {
        console.error('No hay artista seleccionado para actualizar');
        return;
    }

    const formData = new FormData();
    formData.append('nombre', selectedArtista.nombre || '');
    formData.append('id_genero', selectedArtista.id_genero || '');
    
    if (selectedArtista.imagen instanceof File) {
        formData.append('imagen', selectedArtista.imagen);
    }

    axios
        .patch(`http://127.0.0.1:3000/artistas/${selectedArtista.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
            console.log('Artista actualizado:', response.data);
            setShowModal(false);
            fetchArtistas();
        })
        .catch(err => {
            console.error('Error al editar el artista:', err);
        });
};




  return (
    <div>
      <h2>Artistas</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del artista"
          value={newArtista.nombre}
          onChange={(e) => setNewArtista({ ...newArtista, nombre: e.target.value })}
          className="form-control mb-2"
        />
        <select
          className="form-control mb-2"
          value={newArtista.id_genero}
          onChange={(e) => setNewArtista({ ...newArtista, id_genero: e.target.value })}
        >
          <option value="">Seleccionar Género</option>
          {generos.map((genero) => (
            <option key={genero.id} value={genero.id}>
              {genero.nombre}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setNewArtista({ ...newArtista, imagen: e.target.files[0] })}
          className="form-control mb-2"
        />
        <button className="btn btn-success" onClick={handleCreate}>
          Agregar Artista
        </button>
      </div>
      <ul className="list-group">
        {artistas.map((artista) => (
          <li
            key={artista.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <img
                src={artista.imagen}
                alt={artista.nombre}
                style={{ width: 150, marginRight: 10 }}
              />
              {artista.nombre} - {artista.genero?.nombre}
            </div>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  setSelectedArtista(artista);
                  setShowModal(true);
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(artista.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Artista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nombre del artista"
            value={selectedArtista?.nombre || ''}
            onChange={(e) =>
              setSelectedArtista({ ...selectedArtista, nombre: e.target.value })
            }
            className="form-control mb-2"
          />
          <select
            className="form-control mb-2"
            value={selectedArtista?.id_genero || ''}
            onChange={(e) =>
              setSelectedArtista({ ...selectedArtista, id_genero: e.target.value })
            }
          >
            <option value="">Seleccionar Género</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nombre}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) =>
              setSelectedArtista({ ...selectedArtista, imagen: e.target.files[0] })
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

export default ArtistaCrud;
