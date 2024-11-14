import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Form, FormControl, Dropdown } from 'react-bootstrap';

function Header() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState({
    generos: [],
    artistas: [],
    albunes: [],
    canciones: [],
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 1) {
        axios
          .get(`http://127.0.0.1:3000/search?q=${query}`)
          .then((response) => {
            setSuggestions(response.data);
          })
          .catch((error) => {
            console.error('Error en la búsqueda:', error);
          });
      } else {
        setSuggestions({
          generos: [],
          artistas: [],
          albunes: [],
          canciones: [],
        });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Spotify App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/admin">--</Nav.Link>
          </Nav>
          <Form className="d-flex position-relative">
  <FormControl
    type="search"
    placeholder="Buscar..."
    className="me-2"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  {query.length > 1 && (
    <Dropdown.Menu show className="position-absolute w-100">
      {suggestions.generos.length > 0 && (
        <Dropdown.Header>Géneros</Dropdown.Header>
      )}
      {suggestions.generos.map((item) => (
        <Dropdown.Item key={`genero-${item.id}`} as={Link} to={`/genero/${item.id}`}>
          {item.nombre}
        </Dropdown.Item>
      ))}

      {suggestions.artistas.length > 0 && (
        <Dropdown.Header>Artistas</Dropdown.Header>
      )}
      {suggestions.artistas.map((item) => (
        <Dropdown.Item key={`artista-${item.id}`} as={Link} to={`/artista/${item.id}`}>
          {item.nombre}
        </Dropdown.Item>
      ))}

      {suggestions.albunes.length > 0 && (
        <Dropdown.Header>Álbumes</Dropdown.Header>
      )}
      {suggestions.albunes.map((item) => (
        <Dropdown.Item 
          key={`albun-${item.id}`} 
          as={Link} 
          to={`/artista/${item?.artista?.id || '#'}`}
        >
          {item.nombre}
        </Dropdown.Item>
      ))}

      {suggestions.canciones.length > 0 && (
        <Dropdown.Header>Canciones</Dropdown.Header>
      )}
      {suggestions.canciones.map((item) => {
        const artistaId = item.albun?.artista?.id;
        return artistaId ? (
          <Dropdown.Item key={`cancion-${item.id}`} as={Link} to={`/artista/${artistaId}`}>
            {item.nombre}
          </Dropdown.Item>
        ) : (
          <Dropdown.Item key={`cancion-${item.id}`} disabled>
            {item.nombre} (Sin artista)
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  )}
</Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
