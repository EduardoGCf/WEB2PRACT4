import { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import GeneroCrud from '../components/GeneroCrud';
import AlbunCrud from '../components/AlbunCrud';
import ArtistaCrud from '../components/ArtistaCrud';
import CancionCrud from '../components/CancionCrud';

function AdminPage() {
  const [key, setKey] = useState('genero');

  return (
    <Container className="mb-5"> {/* Agregado el Container con clase mb-5 */}
      <Tabs
        id="admin-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="genero" title="Géneros">
          <GeneroCrud key={key} />
        </Tab>
        <Tab eventKey="artista" title="Artistas">
          <ArtistaCrud key={key} />
        </Tab>
        <Tab eventKey="albun" title="Álbumes">
          <AlbunCrud key={key} />
        </Tab>
        <Tab eventKey="cancion" title="Canciones">
          <CancionCrud key={key} />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminPage;
