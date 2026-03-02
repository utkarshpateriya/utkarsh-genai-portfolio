import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-neural-black flex items-center justify-center px-4">
      <div className="glass rounded-xl p-8 w-full max-w-md">
        <h1 className="font-display text-2xl text-cyber-cyan mb-2 text-center">ADMIN HUD</h1>
        <p className="text-dim-gray text-xs font-mono text-center mb-8">Restricted Access</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-dim-gray mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-neural-black border border-white/10 rounded-lg font-mono text-sm text-white focus:border-cyber-cyan/50 focus:outline-none transition-colors"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-dim-gray mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neural-black border border-white/10 rounded-lg font-mono text-sm text-white focus:border-cyber-cyan/50 focus:outline-none transition-colors"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-mono">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 font-mono text-sm rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20 transition-all"
          >
            Authenticate
          </button>
        </form>

        <a href="/" className="block mt-6 text-center text-xs font-mono text-dim-gray/50 hover:text-dim-gray transition-colors">
          ← Return to site
        </a>
      </div>
    </div>
  );
}
