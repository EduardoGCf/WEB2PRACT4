import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Home() {
  const [generos, setGeneros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = () => {
    axios
      .get('http://127.0.0.1:3000/genero')
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los géneros:', error);
      });
  };

  const handleGeneroClick = (id) => {
    navigate(`/genero/${id}`);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Explora Géneros</h1>
      <Row>
        {generos.map((genero) => (
          <Col key={genero.id} sm={6} md={4} lg={3} className="mb-4">
            <Card 
              className="text-center shadow" 
              onClick={() => handleGeneroClick(genero.id)} 
              style={{ cursor: 'pointer' }}
            >
              <Card.Img 
                variant="top" 
                src={genero.imagen} 
                alt={genero.nombre} 
                style={{ height: '150px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title>{genero.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
