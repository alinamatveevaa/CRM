export async function loadClients() {
    const response = await fetch(`http://localhost:3000/api/clients`);
    const data = await response.json();
    return data;
}