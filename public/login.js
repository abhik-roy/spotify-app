function Login() {
  const handleLogin = () => {
    window.location.href = "/auth/login";
  };

  return (
    <div>
      <h2>Login with Spotify</h2>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

ReactDOM.render(<Login />, document.getElementById("root"));
function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

ReactDOM.render(<Login />, document.getElementById("root"));
