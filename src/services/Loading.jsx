function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Carregando...</p>

      {/* animação */}
      <style>
        {`
          @keyframes girar {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px'
  },

  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #ccc',
    borderTop: '4px solid #2b7bb9',
    borderRadius: '50%',
    animation: 'girar 1s linear infinite'
  },

  text: {
    marginTop: '10px',
    color: '#555'
  }
}

export default Loading