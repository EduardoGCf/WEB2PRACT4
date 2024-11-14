import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function GeneroCrud() {
  const [generos, setGeneros] = useState([]);
  const [newGenero, setNewGenero] = useState({ nombre: '', imagen: '' });
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = () => {
    axios
      .get('http://127.0.0.1:3000/genero')
      .then(response => setGeneros(response.data))
      .catch(error => console.error('Error al cargar los géneros:', error));
  };

  const handleCreate = () => {
    const formData = new FormData();
    formData.append('nombre', newGenero.nombre);
    formData.append('imagen', newGenero.imagen);

    axios
      .post('http://127.0.0.1:3000/genero', formData)
      .then(() => {
        fetchGeneros();
        setNewGenero({ nombre: '', imagen: '' });
      })
      .catch(error => console.error('Error al crear el género:', error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/genero/${id}`)
      .then(() => fetchGeneros())
      .catch(error => console.error('Error al eliminar el género:', error));
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append('nombre', selectedGenero.nombre);
    if (selectedGenero.imagen instanceof File) {
      formData.append('imagen', selectedGenero.imagen);
    }

    axios
      .patch(`http://127.0.0.1:3000/genero/${selectedGenero.id}`, formData)
      .then(() => {
        fetchGeneros();
        setShowModal(false);
      })
      .catch(error => console.error('Error al editar el género:', error));
  };

  return (
    <div>
      <h2>Géneros</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del género"
          value={newGenero.nombre}
          onChange={(e) => setNewGenero({ ...newGenero, nombre: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="file"
          onChange={(e) => setNewGenero({ ...newGenero, imagen: e.target.files[0] })}
          className="form-control mb-2"
        />
        <button className="btn btn-success" onClick={handleCreate}>
          Agregar Género
        </button>
      </div>
      <ul className="list-group">
        {generos.map((genero) => (
          <li
            key={genero.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
            <img
  src={genero.imagen}
  alt={genero.nombre}
  style={{ width: 150, marginRight: 10 }}
/>

              {genero.nombre}
            </div>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => {
                  setSelectedGenero(genero);
                  setShowModal(true);
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(genero.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Género</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nombre del género"
            value={selectedGenero?.nombre || ''}
            onChange={(e) =>
              setSelectedGenero({ ...selectedGenero, nombre: e.target.value })
            }
            className="form-control mb-2"
          />
          <input
            type="file"
            onChange={(e) =>
              setSelectedGenero({ ...selectedGenero, imagen: e.target.files[0] })
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

export default GeneroCrud;
