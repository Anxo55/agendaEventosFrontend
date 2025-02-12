const URL_BASE = import.meta.env.VITE_API_BASE_URL

export const getAll = async () => {

    try {
    
    const response = await fetch(URL_BASE + '/events/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return await response.json()
} catch (error) {
    const msg = error instanceof Error ? error.message : 'Error desconocido'
    throw new Error(msg)
        
}
    
}

export const getById = async  (id:number) => {
    try {
        
        const response = await fetch(URL_BASE + '/events/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        return await response.json()

} catch (error) {
    const msg = error instanceof Error ? error.message : 'Error desconocido'
    throw new Error(msg)
}

}