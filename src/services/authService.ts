// const URL_BASE = 'http://localhost:3000/api/'
const URL_BASE = import.meta.env.VITE_API_BASE_URL
export const loginUser = async (email:string, password: string) => {

    try {
        const response = await fetch(URL_BASE + '/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
                
            }
        )
        if(!response.ok){
            throw new Error('Error al iniciar sesión')
        }
        const data = await response.json()
        console.log('REspuesta del login', data)

        if (data.token) {
            localStorage.setItem("token", data.token); // 👈 Guarda el token
        } else {
            throw new Error("No se recibió un token válido");
        }

        return data;
        
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}


export const registerUser = async (name:string, surname:string, email:string, password: string, role:string, course:string) => {

    try {
        const response = await fetch(URL_BASE + '/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, surname, email, password, role, course }),
                credentials: 'include'
                
            }
        )
        if(!response.ok){
            throw new Error('Error al registrarse')
        }
        return response.json()
        
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}