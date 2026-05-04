import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [visits, setVisits] = useState('...');
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [githubData, setGithubData] = useState(null);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
   // fetch('http://localhost:3001/api/visits', { method: 'POST' })
   fetch('[https://github-profile-tracker.onrender.com/api/visits](https://github-profile-tracker.onrender.com/api/visits)', { method: 'POST' })
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
        throw new Error('Perfil no encontrado');
      }

      const data = await response.json();
      setGithubData(data);
      
    } catch (err) {
      console.error("Error buscando en GitHub:", err);
      setSearchError(true);
    }
  };

  return (
    <main className="main-container">
      
      <h1>Github Profile Tracker</h1>
      
      <div className="visit-counter">
        <span>👤</span> 
        {error ? (
          <span className="error-text">Servidor desconectado</span>
        ) : (
          <span>Visitantes totales: <strong>{visits}</strong></span>
        )}
      </div>

      <hr />
      
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Escribe un usuario (ej. NKGarzonGrajales)..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar Perfil</button>
      </form>

      {searchError && (
        <p className="error-message">No pudimos encontrar a ese perfil en la base de datos de GitHub. 🤔</p>
      )}
      
      {!githubData && !searchError && (
        <p className="status-message">Escribe un nombre arriba para ver el expediente del usuario.</p>
      )}

      {githubData && (
        <article className="github-card">
          
          <div className="avatar-container">
            <img 
              src={githubData.avatar_url} 
              alt={`Foto de perfil de ${githubData.login}`} 
              className="avatar-img"
            />
          </div>

          <div className="athlete-info">
            <h2 className="athlete-name">{githubData.name || githubData.login}</h2>
            {githubData.bio && <p className="athlete-bio">{githubData.bio}</p>}
          </div>

          <div className="stats-container">
            <div className="stat-box">
              <div className="stat-value">{githubData.public_repos}</div>
              <div className="stat-label">Repos</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{githubData.followers}</div>
              <div className="stat-label">Seguidores</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{githubData.following}</div>
              <div className="stat-label">Siguiendo</div>
            </div>
          </div>

        </article>
      )}

    </main>
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
