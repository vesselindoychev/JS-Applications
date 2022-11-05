function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getAllContacts);
    document.getElementById('btnCreate').addEventListener('click', createEntry);

}

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
    
    getAllContacts();
    personNameInput.value = '';
    phoneNumberInput.value = '';
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
    renderContacts(data);
    
}

function onDelete(data) {
    let phoneBookUl = document.getElementById('phonebook');
    let currentLi = Array.from(phoneBookUl.children).find(li => li.getAttribute('id') == data._id);
    currentLi.remove();
}

async function deleteEntry(event) {
    let key = event.target.parentElement.getAttribute('id');
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${key}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    onDelete(data);
}

attachEvents();