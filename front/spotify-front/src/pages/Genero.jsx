import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Genero() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genero, setGenero] = useState(null);
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    fetchGenero();
    fetchArtistas();
  }, [id]);

  const fetchGenero = () => {
    axios
      .get(`http://127.0.0.1:3000/genero/${id}`)
      .then((response) => {
        setGenero(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar el género:', error);
      });
  };

  const fetchArtistas = () => {
    axios
      .get(`http://127.0.0.1:3000/genero/${id}/artistas`)
      .then((response) => {
        setArtistas(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los artistas:', error);
      });
  };

  const handleArtistaClick = (id) => {
    navigate(`/artista/${id}`); // Redirige a la página del artista seleccionado
  };

  return (
    <Container className="mt-4">
      {genero && (
        <div className="text-center mb-4">
          <img
            src={genero.imagen}
            alt={genero.nombre}
            className="img-fluid mb-3"
            style={{ maxWidth: '300px', borderRadius: '8px' }}
          />
          <h1>{genero.nombre}</h1>
        </div>
      )}
      <h2 className="text-center mb-4">Artistas de este Género</h2>
      <Row>
        {artistas.map((artista) => (
          <Col key={artista.id} sm={6} md={4} lg={3} className="mb-4">
            <Card 
              className="text-center shadow" 
              onClick={() => handleArtistaClick(artista.id)} 
              style={{ cursor: 'pointer' }}
            >
              <Card.Img 
                variant="top" 
                src={`http://127.0.0.1:3000/uploads/${artista.imagen}`} 
                alt={artista.nombre} 
                style={{ height: '150px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title>{artista.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Genero;
