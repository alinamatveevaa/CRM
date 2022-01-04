export async function createTableRow(array) {

    for (let i = 0; i < array.length; i++) {

        let tableRow = document.createElement('tr');
        tableRow.classList.add('table__row');

        let tableCell1 = document.createElement('td');
        tableCell1.classList.add('column-1', 'table__cell');
        tableCell1.setAttribute('data-action', 'none');

        let tableCell2 = document.createElement('td');
        tableCell2.classList.add('column-2', 'table__cell');
        tableCell2.setAttribute('data-action', 'none')
    
        let tableCell3 = document.createElement('td');
        tableCell3.classList.add('column-3', 'table__cell');
        tableCell3.setAttribute('data-action', 'none')

        let dateCreate = document.createElement('span');
        dateCreate.classList.add('date');
        let timeCreate = document.createElement('span');
        timeCreate.classList.add('time');

        tableCell3.append(dateCreate);
        tableCell3.append(timeCreate);
    
        let tableCell4 = document.createElement('td');
        tableCell4.classList.add('column-4', 'table__cell');
        tableCell4.setAttribute('data-action', 'none')

        let dateUpdate = document.createElement('span');
        dateUpdate.classList.add('date-update');
        let timeUpdate = document.createElement('span');
        timeUpdate.classList.add('time-update');

        tableCell4.append(dateUpdate);
        tableCell4.append(timeUpdate);

        let tableCell5 = document.createElement('td');
        tableCell5.classList.add('column-5', 'table__cell');
        tableCell5.setAttribute('data-action', 'none')

        let tableCell6 = document.createElement('td');
        tableCell6.classList.add('column-6', 'table__cell', 'change', 'open-modal');
        tableCell6.setAttribute('data-action', 'change');
        tableCell6.textContent = 'Изменить';

        let tableCell7 = document.createElement('td');
        tableCell7.classList.add('column-7', 'table__cell', 'delete', 'open-modal');
        tableCell7.setAttribute('data-action', 'delete');
        tableCell7.textContent = 'Удалить';
        
        tableRow.append(tableCell1, tableCell2, tableCell3, tableCell4, tableCell5, tableCell6, tableCell7);

        tableCell1.textContent = array[i].id;
        tableCell2.textContent = array[i].surname + ' ' + array[i].name + ' ' +  array[i].lastName;

        function makeDate() {
            // Дата и время создания
            let createdDate = new Date(array[i].createdAt);
            let createdDateFormat = createdDate.toLocaleDateString();
            
            let formatter = new Intl.DateTimeFormat("ru", {
                hour: "numeric",
                minute: "numeric"
            });            
            let createdTime = formatter.format(createdDate);

            dateCreate.textContent = `${createdDateFormat}`;
            timeCreate.textContent = `${createdTime}`;

            // Дата и время изменения
            let updatedDate = new Date(array[i].updatedAt);
            let updatedDateFormat = updatedDate.toLocaleDateString();

            dateUpdate.textContent = `${updatedDateFormat}`;
            let updatedTime = formatter.format(updatedDate);
            timeUpdate.textContent = `${updatedTime}`;
        }

        if (array[i].contacts.length === 0) {
            let empty = document.createElement('div');
            tableCell5.append(empty);
        } else {
            for (let j = 0; j < array[i].contacts.length; j++) {
                
                let contactsIcon =  document.createElement('div');
                contactsIcon.classList.add('contacts__icon');
                let contactsTooltip = document.createElement('a');
                contactsTooltip.classList.add('contacts__tooltip');
                contactsIcon.append(contactsTooltip);

                contactsTooltip.textContent = array[i].contacts[j].type + ': ' + array[i].contacts[j].value;

                if (array[i].contacts[j].type == 'Телефон') {
                    contactsIcon.classList.add('contacts__phone');
                    contactsTooltip.href = `tel:${array[i].contacts[j].value}`;
                } else if (array[i].contacts[j].type == 'Facebook') {
                    contactsIcon.classList.add('contacts__facebook');
                    contactsTooltip.href = `${array[i].contacts[j].value}`;
                } else if (array[i].contacts[j].type == 'VK') {
                    contactsIcon.classList.add('contacts__vk');
                    contactsTooltip.href = `${array[i].contacts[j].value}`;
                } else if (array[i].contacts[j].type == 'Email') {
                    contactsIcon.classList.add('contacts__email');
                    contactsTooltip.href = `mailto:${array[i].contacts[j].value}`;
                }
                tableCell5.append(contactsIcon)
            }
        }

        makeDate();

        (document.querySelector('.table__body')).append(tableRow);
    }
}