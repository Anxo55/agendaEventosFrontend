import { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/usersService";
// import { fetchUserProfile } from "../api";

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export default function Profile() {
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        if (userData) {
          setUser(userData);
        } else {
          setError("No se pudo obtener la información del usuario.");
        }
      } catch {
        setError("Error al cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No hay datos de usuario.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-950 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </div>
  );
}
