import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ParticlesBackground from "../../components/Particles";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@demo.com" && password === "123456") {
        navigate("/dashboard");
      } else {
        setError("Credenciales inválidas");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <ParticlesBackground />
      <div className="auth-card w-full max-w-lg bg-slate-50/95 shadow-xl rounded-2xl p-10 backdrop-blur-md border border-slate-200">
  <h2 className="text-4xl font-extrabold text-center text-slate-700 mb-8">
    Iniciar Sesión
  </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    <input
      type="email"
      placeholder="Correo electrónico"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full px-5 py-4 border border-slate-300 rounded-xl bg-white text-slate-700 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full px-5 py-4 border border-slate-300 rounded-xl bg-white text-slate-700 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
    />
    {error && (
      <p className="text-red-500 text-base text-center font-medium">
        {error}
      </p>
    )}
    <Button
      type="submit"
      disabled={loading}
      className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-semibold py-4 rounded-xl shadow-md text-lg transition duration-200"
    >
      {loading ? "Ingresando..." : "Entrar"}
    </Button>
  </form>
</div>

    </div>
  );
};

export default Login;
