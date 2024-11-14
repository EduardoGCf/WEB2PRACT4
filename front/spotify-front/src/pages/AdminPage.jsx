import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import GeneroCrud from '../components/GeneroCrud';
import AlbunCrud from '../components/AlbunCrud';
import ArtistaCrud from '../components/ArtistaCrud';
import CancionCrud from '../components/CancionCrud';

function AdminPage() {
  const [key, setKey] = useState('genero');

  return (
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
  );
}

export default AdminPage;
