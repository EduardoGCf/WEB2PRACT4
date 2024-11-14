import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';

function Artista() {
  const { id } = useParams();
  const [artista, setArtista] = useState(null);
  const [albunes, setAlbunes] = useState([]);
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null);

  useEffect(() => {
    fetchArtista();
    fetchAlbumes();
  }, [id]);

  const fetchArtista = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/artistas/${id}`);
      setArtista(response.data);
    } catch (err) {
      console.error('Error al cargar el artista:', err);
    }
  };

  const fetchAlbumes = async () => {
    try {
      const responseAlbunes = await axios.get(`http://127.0.0.1:3000/artistas/${id}/albunes`);
      const albunesConCanciones = await Promise.all(
        responseAlbunes.data.map(async (albun) => {
          const cancionesResponse = await axios.get(`http://127.0.0.1:3000/albunes/${albun.id}/canciones`);
          return {
            ...albun,
            canciones: Array.isArray(cancionesResponse.data) ? cancionesResponse.data : [],
          };
        })
      );
      setAlbunes(albunesConCanciones);
    } catch (err) {
      console.error('Error al cargar los álbumes:', err);
    }
  };

  return (
    <Container className="mt-4" style={{ paddingBottom: '100px' }}>
      {artista && (
        <div className="text-center mb-4">
          <img 
            src={artista.imagen} 
            alt={artista.nombre} 
            style={{ width: '200px', height: '200px', borderRadius: '50%' }} 
          />
          <h1>{artista.nombre}</h1>
        </div>
      )}

      <Row>
        {albunes.map((albun) => (
          <Col key={albun.id} sm={12} className="mb-4">
            <Card className="shadow d-flex flex-row">
              <Card.Img 
                variant="left" 
                src={albun.imagen} 
                alt={albun.nombre}
                style={{ width: '150px', height: 'auto', objectFit: 'cover' }} 
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{albun.nombre}</Card.Title>
                <ListGroup variant="flush">
                  {(albun.canciones || []).map((cancion) => (
                    <ListGroup.Item 
                      key={cancion.id} 
                      onClick={() => setCancionSeleccionada(cancion)}
                      style={{ cursor: 'pointer' }}
                    >
                      {cancion.nombre}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {cancionSeleccionada && (
        <footer 
          className="fixed-bottom bg-dark text-white p-3"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>{cancionSeleccionada.nombre}</span>
          <audio controls src={cancionSeleccionada.cancion_mp3} />
        </footer>
      )}
    </Container>
  );
}

export default Artista;
