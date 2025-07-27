function Login() {
  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div>
      <h2>Login with Spotify</h2>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

ReactDOM.render(<Login />, document.getElementById('root'));
