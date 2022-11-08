function students() {
    // document.getElementById('submit').addEventListener('click', handleCreateRecord);
    let submitBtn = document.getElementById('submit')
    submitBtn.addEventListener('click', handleCreateRecord);
}

function displayRecords(data) {
    let tbody = document.querySelector('tbody');

    tbody.innerHTML = '';
    Object.values(data).forEach(rec => {
        let tableRow = document.createElement('tr');
        let fNameData = document.createElement('td');
        let lNameData = document.createElement('td');
        let facultyNumberData = document.createElement('td');
        let gradeData = document.createElement('td');

        fNameData.textContent = rec.firstName;
        lNameData.textContent = rec.lastName;
        facultyNumberData.textContent = rec.facultyNumber;
        gradeData.textContent = rec.grade;

        tableRow.appendChild(fNameData);
        tableRow.appendChild(lNameData);
        tableRow.appendChild(facultyNumberData);
        tableRow.appendChild(gradeData);
        tbody.appendChild(tableRow);
    })
}

async function getAllRecords() {
    // event.preventDefault();
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const response = await fetch(url);
    const data = await response.json();
    return displayRecords(data)
}


function handleCreateRecord(event) {
    event.preventDefault();
    let fNameInput = document.getElementsByName('firstName')[0];
    let lNameInput = document.getElementsByName('lastName')[0];
    let facultyNumberInput = document.getElementsByName('facultyNumber')[0];
    let gradeInput = document.getElementsByName('grade')[0];

    if (!fNameInput.value || !lNameInput.value || !facultyNumberInput.value || !gradeInput.value) {
        event.preventDefault();
    } else {
        onCreateRecord(fNameInput.value, lNameInput.value, facultyNumberInput.value, gradeInput.value);
    }

    
    
    fNameInput.value = '';
    lNameInput.value = '';
    facultyNumberInput.value = '';
    gradeInput.value = '';
}

async function onCreateRecord(firstName, lastName, facultyNumber, grade) {
    const body = {
        firstName, 
        lastName, 
        facultyNumber, 
        grade
    }
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    getAllRecords();
    return data;
}

students();