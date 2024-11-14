import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import Genero from './pages/Genero';
import Header from './components/Header';
import Artista from './pages/Artista';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/artista/:id" element={<Artista />} />
        <Route path="/genero/:id" element={<Genero />} />
      </Routes>
    </div>
  );
}

export default App;
