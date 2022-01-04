export async function changeClients(id, name, surname, lastName, contacts) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: `PATCH`,
        body: JSON.stringify({
            name: name,
            surname: surname,
            lastName: lastName,
            contacts: contacts
        }),
        headers: {
            'Content-Type': 'application/json',
    }
    });
    const data = await response.json();
    return response.status;
}