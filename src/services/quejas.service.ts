const URL_BASE = import.meta.env.VITE_API_BASE_URL


export const getAll = async () => {

    try {
    
    const response = await fetch(`${URL_BASE}/quejas/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json()
} catch (error) {
    const msg = error instanceof Error ? error.message : 'Error desconocido'
    throw new Error(msg)
        
}
    
}

interface QuejaData {
    title: string;
    description: string;
}

export const createQueja = async (quejaData: QuejaData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');

        const response = await fetch(`${URL_BASE}/quejas/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(quejaData),
            credentials: 'include'
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (!response.ok) {
            throw new Error('Error al crear la queja');
        }

        return data;
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error desconocido';
        throw new Error(msg);
    }
};


