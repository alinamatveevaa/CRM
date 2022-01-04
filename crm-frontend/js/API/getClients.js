export async function getClients(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`);
    const data = await response.json();
    
    return data;
}