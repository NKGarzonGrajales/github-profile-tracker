import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [visits, setVisits] = useState('...');
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [githubData, setGithubData] = useState(null);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/visits', { method: 'POST' })
      .then(respuesta => respuesta.json())
      .then(datos => {
        if (datos.success) setVisits(datos.totalVisits);
        else setError(true);
      })
      .catch(() => setError(true));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError(false); 
    setGithubData(null);   

    if (!username) return; 

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error('Atleta no encontrado');
      }

      const data = await response.json();
      setGithubData(data);
      
    } catch (err) {
      console.error("Error buscando en GitHub:", err);
      setSearchError(true);
    }
  };

  return (
    <div>
      <h1>Recepción de mi Perfil de GitHub</h1>
      
      {error ? (
        <p style={{ color: 'red' }}>¡Ups! El Deportólogo no contesta. ¿El backend está encendido?</p>
      ) : (
        <p>Visitantes totales del perfil: <strong>{visits}</strong></p>
      )}

      <hr />
      
      <form onSubmit={handleSearch}>
        <h2>Buscar Perfil de GitHub</h2>
        <input 
          type="text" 
          placeholder="Escribe un usuario..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Buscar Perfil</button>
      </form>

      {searchError && <p style={{ color: 'orange' }}>No pudimos encontrar a ese usuario en GitHub. 🕵️‍♀️</p>}

      {githubData && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
          <img 
            src={githubData.avatar_url} 
            alt="Foto de perfil" 
            style={{ width: '150px', borderRadius: '50%' }} 
          />
          <h3>{githubData.name || githubData.login}</h3>
          <p>{githubData.bio}</p>
          <p><strong>Repositorios Públicos:</strong> {githubData.public_repos}</p>
          <p><strong>Seguidores:</strong> {githubData.followers}</p>
        </div>
      )}

    </div>
  )
}

export default App


/*</div>import './App.css'

function App() {
  return (
    <div>
      <h1>Recepción de mi Perfil de GitHub</h1>
      <p>Conectando con el Deportólogo...</p>
    </div>
  )
}

export default App*/
