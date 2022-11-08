function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getAllContacts);
    document.getElementById('btnCreate').addEventListener('click', createEntry);

}


// function handleCreateEntry () {
//     let personNameInput = document.getElementById('person');
//     let phoneNumberInput = document.getElementById('phone');
//     let person = personNameInput.value;
//     let phone = phoneNumberInput.value;
//     createEntry(person, phone);

// }
async function createEntry() {
    let personNameInput = document.getElementById('person');
    let phoneNumberInput = document.getElementById('phone');
    let person = personNameInput.value;
    let phone = phoneNumberInput.value;
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ person, phone })
    });
    const data = await response.json()
    getAllContacts();
    personNameInput.value = '';
    phoneNumberInput.value = '';
    return data;
}

function renderContacts(data) {
    let phoneBookUl = document.getElementById('phonebook');

    if (phoneBookUl.children) {
        phoneBookUl.innerHTML = '';
    } 
    let phoneBookEntries = Object.values(data);
    for (let contact of phoneBookEntries) {
        let li = document.createElement('li');
        li.textContent = `${contact.person}: ${contact.phone}`
        li.setAttribute('id', contact._id);
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', deleteEntry);
        li.appendChild(delBtn)
        phoneBookUl.appendChild(li);
    }
    
}

async function getAllContacts() {
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook`);
    const data = await response.json();
    return renderContacts(data);
    
}

// function onDelete(data) {
//     let phoneBookUl = document.getElementById('phonebook');
//     let currentLi = Array.from(phoneBookUl.children).find(li => li.getAttribute('id') == data._id);
//     currentLi.remove();
// }

async function deleteEntry(event) {
    let currentLi = event.target.parentElement;
    let key = event.target.parentElement.getAttribute('id');
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${key}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    currentLi.remove();
    // onDelete(data);
}

attachEvents();

// function attachEvents() {
//     document.getElementById('btnLoad').addEventListener('click', onLoadAllRecords);
//     document.getElementById('btnCreate').addEventListener('click', handleCreateRecord);
// }

// function handleCreateRecord() {
//     let nameInput = document.getElementById('person');
//     let phoneInput = document.getElementById('phone');

//     onCreateRecord(nameInput.value, phoneInput.value);

//     nameInput.value = '';
//     phoneInput.value = '';
// }

// function renderRecord(data) {
//     let ul = document.getElementById('phonebook');
//     ul.innerHTML = '';
//     Object.values(data).forEach(rec => {
//         let li = document.createElement('li');
//         li.textContent = `${rec.person}: ${rec.phone}`;
//         li.setAttribute('data-id', rec._id);

//         let btn = document.createElement('button');
//         btn.textContent = 'Delete';
//         btn.addEventListener('click', handleDelete)
//         li.appendChild(btn);
//         ul.appendChild(li);
//     })
// }

// function handleDelete(event) {
//     let li = event.target.parentElement;
//     let id = li.getAttribute('data-id');
    
//     onDeleteRecord(id);
//     li.remove();
// }

// async function onLoadAllRecords() {
//     const url = 'http://localhost:3030/jsonstore/phonebook';
//     const response = await fetch(url);
//     const data = await response.json();

//     return renderRecord(data);
// }

// async function onCreateRecord(person, phone) {
//     const url = 'http://localhost:3030/jsonstore/phonebook';
//     const body = {person, phone}
//     const header = getHeader('post', body);
//     const response = await fetch(url, header);

//     const data = await response.json();
//     onLoadAllRecords();
//     return data;
// }

// async function onDeleteRecord(id) {
//     const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
//     const header = getHeader('delete', null);
//     const response = await fetch(url, header);

//     const data = await response.json();
//     return data;
// }

// function getHeader(method, body) {
//     return {
//         method: `${method}`,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     }
// }

// attachEvents();