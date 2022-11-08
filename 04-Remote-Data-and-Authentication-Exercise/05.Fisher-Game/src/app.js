window.addEventListener('DOMContentLoaded', onLoadHTML)
document.getElementById('logout').addEventListener('click', onLogout);
let span = document.getElementsByClassName('email')[0].querySelector('span');
let addBtn = document.getElementsByClassName('add')[0];
let addForm = document.getElementById('addForm');
let divCatches = document.getElementById('catches');
Array.from(divCatches.children).forEach(child => child.style.display = 'none')
document.getElementsByClassName('load')[0].addEventListener('click', onLoadCatches);
addForm.addEventListener('submit', createCatch);

function onLoadHTML() {
    const token = sessionStorage.getItem('accessToken');
    const userEmail = sessionStorage.getItem('email'); 
    let span = document.getElementsByClassName('email')[0].querySelector('span');
    

    if (token) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
        span.textContent = userEmail;
        addBtn.disabled = false;
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
        span.textContent = 'guest';
        addBtn.disabled = true;
    }
}

function renderCatches(data) {
    const userId = sessionStorage.getItem('id');
    let result = Object.values(data);
    divCatches.innerHTML = '';
    let divArr = [];
    let counter = -1
    for (let obj of result) {
        counter += 1
        if (counter == 0 || counter == 1) {
            continue;
        }
        let div = document.createElement('div');

        let updateBtn = document.createElement('button');
        updateBtn.classList.add('update');
        updateBtn.setAttribute('data-id', obj._ownerId)
        updateBtn.textContent = 'Update'
        updateBtn.setAttribute('el-id', obj._id);
        updateBtn.addEventListener('click', onUpdateCatch);
        
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.setAttribute('data-id', obj._ownerId);
        deleteBtn.setAttribute('el-id', obj._id);
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', onDeleteCatch);

        if (userId !== obj._ownerId) {
            updateBtn.disabled = true;
            deleteBtn.disabled = true;
        } else {
            updateBtn.disabled = false;
            deleteBtn.disabled = false;
        }

        div.classList.add('catch');
       
        div.innerHTML = `<label>Angler</label>
        <input type="text" class="angler" value="${obj.angler}">
        <label>Weight</label>
        <input type="text" class="weight" value="${obj.weight}">
        <label>Species</label>
        <input type="text" class="species" value="${obj.species}">
        <label>Location</label>
        <input type="text" class="location" value="${obj.location}">
        <label>Bait</label>
        <input type="text" class="bait" value="${obj.bait}">
        <label>Capture Time</label>
        <input type="number" class="captureTime" value=${obj.captureTime}>`
        div.appendChild(updateBtn);
        div.appendChild(deleteBtn);
        divArr.push(div);
    }

    divArr.forEach(el => {
        divCatches.appendChild(el);
    })

    
}

async function onUpdateCatch(event) {
    let token = sessionStorage.getItem('accessToken')
    let inputs = event.target.parentElement.querySelectorAll('input');
    let catchId = event.target.getAttribute('el-id')
    const url = `http://localhost:3030/data/catches/${catchId}`;
    const response = await fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({
            angler: inputs[0].value,
            weight: inputs[1].value,
            species: inputs[2].value,
            location: inputs[3].value,
            bait: inputs[4].value,
            captureTime: inputs[5].value,
        })
    });
    const data = await response.json();
    return data;
    
}


function createCatch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    onCreateCatch(data);

    for (let inputField of addForm.querySelectorAll('fieldset input')) {
        inputField.value = '';
    }
    
}

async function onDeleteCatch(event) {
    const id = event.target.getAttribute('el-id');
    const url = `http://localhost:3030/data/catches/${id}`;
    const header = getHeader('delete', null);
    const response = await fetch(url, header);
    onLoadCatches();
    
}

async function onLogout() {
    const url = `http://localhost:3030/users/logout`;
    const header = getHeader('get');
    const response = await fetch(url, header);
    sessionStorage.clear();
    onLoadHTML();
}

async function onCreateCatch(body) {
    const url = `http://localhost:3030/data/catches`;
    const header = getHeader('post', body);
    const response = await fetch(url, header);
    debugger;
    const data = await response.json();
    onLoadCatches();
    return data;
}

async function onLoadCatches() {
    const url = `http://localhost:3030/data/catches`;
    // const header = getHeader('get', null);
    const response = await fetch(url);
    const data = await response.json();
    return renderCatches(data);
}
function getHeader(method, body) {
    const token = sessionStorage.getItem('accessToken');
    
    const header =  {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    }
    if (body) {
        header.body = JSON.stringify(body);
    }

    return header;
}