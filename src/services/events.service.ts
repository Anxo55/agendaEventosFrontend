const URL_BASE = 'http://localhost:3000/api/'

export const getAll = async () => {

    try {
    
    const response = await fetch(URL_BASE + 'events/', {
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
        
        const response = await fetch(URL_BASE + 'events/' + id, {
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