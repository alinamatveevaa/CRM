export function removeRows() {
    let rows = document.querySelectorAll(`.table__row`);
    Array.from(rows).slice(1).forEach(row => {
        row.remove();
    })
}