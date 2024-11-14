import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function AlbunCrud() {
  const [albunes, setAlbunes] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [newAlbun, setNewAlbun] = useState({ nombre: '', imagen: '', id_artista: '' });
  const [selectedAlbun, setSelectedAlbun] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAlbunes();
    fetchArtistas();
  }, []);

  const fetchAlbunes = () => {
    axios
      .get('http://127.0.0.1:3000/albunes')
      .then(response => setAlbunes(response.data))
      .catch(error => console.error('Error al cargar los álbumes:', error));
  };

  const fetchArtistas = () => {
    axios
      .get('http://127.0.0.1:3000/artistas')
      .then(response => setArtistas(response.data))
      .catch(error => console.error('Error al cargar los artistas:', error));
  };

  const handleCreate = () => {
    if (!newAlbun.nombre || !newAlbun.imagen || !newAlbun.id_artista) {
      alert('Por favor complete todos los campos');
      return;
    }
    const formData = new FormData();
    formData.append('nombre', newAlbun.nombre);
    formData.append('imagen', newAlbun.imagen);
    formData.append('id_artista', newAlbun.id_artista);

    axios
      .post('http://127.0.0.1:3000/albunes', formData)
      .then(() => {
        fetchAlbunes();
        setNewAlbun({ nombre: '', imagen: '', id_artista: '' });
      })
      .catch(error => console.error('Error al crear el álbum:', error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/albunes/${id}`)
      .then(() => fetchAlbunes())
      .catch(error => console.error('Error al eliminar el álbum:', error));
  };

    const handleEdit = () => {
      if (!selectedAlbun || !selectedAlbun.id) {
          console.error("No hay álbum seleccionado para actualizar");
          return;
      }
  
      const formData = new FormData();
      formData.append("nombre", selectedAlbun.nombre || "");
      formData.append("id_artista", selectedAlbun.id_artista || ""); 
  
      if (selectedAlbun.imagen instanceof File) {
          formData.append("imagen", selectedAlbun.imagen);
      }
  
      axios
          .patch(`http://127.0.0.1:3000/albunes/${selectedAlbun.id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
              console.log("Álbum actualizado:", response.data);
              setShowModal(false);
              fetchAlbunes();
          })
          .catch((err) => {
              console.error("Error al editar el álbum:", err);
          });
  };
  return (
    <div>
      <h2>Álbumes</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del álbum"
          value={newAlbun.nombre}
          onChange={(e) => setNewAlbun({ ...newAlbun, nombre: e.target.value })}
          className="form-control mb-2"
        />
        <select
          className="form-control mb-2"
          value={newAlbun.id_artista}
          onChange={(e) => setNewAlbun({ ...newAlbun, id_artista: e.target.value })}
        >
          <option value="">Seleccionar Artista</option>
          {artistas.map((artista) => (
            <option key={artista.id} value={artista.id}>
              {artista.nombre}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setNewAlbun({ ...newAlbun, imagen: e.target.files[0] })}
          className="form-control mb-2"
        />
        <button className="btn btn-success" onClick={handleCreate}>
          Agregar Álbum
        </button>
      </div>
      <ul className="list-group">
        {albunes.map((albun) => (
          <li
            key={albun.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <img
                src={albun.imagen}
                alt={albun.nombre}
                style={{ width: 150, marginRight: 10 }}
              />
              {albun.nombre} - <strong>{albun.artista?.nombre}</strong>
            </div>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  setSelectedAlbun(albun);
                  setShowModal(true);
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(albun.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Álbum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nombre del álbum"
            value={selectedAlbun?.nombre || ''}
            onChange={(e) =>
              setSelectedAlbun({ ...selectedAlbun, nombre: e.target.value })
            }
            className="form-control mb-2"
          />
          <select
            className="form-control mb-2"
            value={selectedAlbun?.id_artista || ''}
            onChange={(e) =>
              setSelectedAlbun({ ...selectedAlbun, id_artista: e.target.value })
            }
          >
            <option value="">Seleccionar Artista</option>
            {artistas.map((artista) => (
              <option key={artista.id} value={artista.id}>
                {artista.nombre}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) =>
              setSelectedAlbun({ ...selectedAlbun, imagen: e.target.files[0] })
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

export default AlbunCrud;
