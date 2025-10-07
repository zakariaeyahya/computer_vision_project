import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎥 Computer Vision Project</h1>
        <p>Projet de vision par ordinateur - CI/CD configuré ✅</p>
      </header>
      
      <main style={styles.main}>
        <div style={styles.card}>
          <h2>Statut du projet</h2>
          <p>Frontend: En développement</p>
          <p>Backend: À venir</p>
          
          <button 
            style={styles.button}
            onClick={() => setCount(count + 1)}
          >
            Compteur de tests: {count}
          </button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center' as const,
    padding: '20px',
  },
  header: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '40px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  main: {
    minHeight: '50vh',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default App;