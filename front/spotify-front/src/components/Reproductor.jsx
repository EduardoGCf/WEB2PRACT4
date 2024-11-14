import { useParams } from 'react-router-dom';

function Reproductor() {
  const { id } = useParams();
  const songUrl = `http://127.0.0.1:3000/canciones/${id}/mp3`;

  return (
    <div>
      <audio controls>
        <source src={songUrl} type="audio/mp3" />
        Tu navegador no soporta el audio.
      </audio>
    </div>
  );
}

export default Reproductor;
