export async function deleteClients(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: `DELETE`
    });
    return response;
}