import axios from "axios";

// const URL_BASE = 'http://localhost:3000/api/'
const URL_BASE = import.meta.env.VITE_API_BASE_URL
export const getUsers = async () => {
    try {
        const response = await fetch(`${URL_BASE}/users/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(!response) {
            throw new Error('Fallo al obtener los usuarios')
        }
        return await response.json()
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}

export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const response = await axios.get(`${URL_BASE}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};
