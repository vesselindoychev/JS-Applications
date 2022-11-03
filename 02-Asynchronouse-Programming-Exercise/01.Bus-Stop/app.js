// 'ASYNC AWAIT SYNTAX'


// async function getInfo() {
//     console.log("TODO...");
//     const busElement = document.getElementById('stopId');
//     const busId = busElement.value;
//     const busStop = document.getElementById('stopName');
//     const busList = document.getElementById('buses');
//     const mainUrl = `http://localhost:3030/jsonstore/bus/businfo`

//     busList.innerHTML = "";
//     busElement.value = '';
//     try {
//         const response = await fetch(`${mainUrl}/${busId}`);
//         const data = await response.json();

//         busStop.textContent = data['name'];

//         for (let bus in data['buses']) {
//             let li = document.createElement('li');
//             li.textContent = `Bus ${bus} arrives in ${data['buses'][bus]} minutes`;
//             busList.appendChild(li);
//         }

//     } catch(error) {
//         busStop.textContent = 'Error'
//     }

// }


// function getInfo() {
//     const  stopIdInput = document.getElementById('stopId');
//     const url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdInput.value}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const stopNameDiv = document.getElementById('stopName');
//             const busesList = document.getElementById('buses');

//             stopIdInput.value = '';
//             busesList.innerHTML = '';

//             stopNameDiv.textContent = data.name;

//             Object.keys(data.buses).forEach(key => {
//                 let li = document.createElement('li');
//                 li.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`;
//                 busesList.appendChild(li);
//             })
            
//         })
//         .catch(error => {
//             const stopNameDiv = document.getElementById('stopName');
//             const busesList = document.getElementById('buses');
//             busesList.innerHTML = '';
//             stopIdInput.value = '';
//             stopNameDiv.textContent = 'Error';
//         })
// }

function getInfo() {
    const stopIdInput = document.getElementById('stopId');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdInput.value}`;

    fetch(url)
        .then(body => body.json())
        .then(result => {
            let stopNameDiv = document.getElementById('stopName');
            let busesList = document.getElementById('buses');
            stopNameDiv.textContent = result.name;

            stopIdInput.value = '';
            busesList.innerHTML = '';

            Object.entries(result.buses).forEach(key => {
                let li = document.createElement('li');
                li.textContent = `Bus ${key[0]} arrives in ${key[1]} minutes`
                busesList.appendChild(li)
            })
        })
        .catch(error => {
            let stopNameDiv = document.getElementById('stopName');
            let busesList = document.getElementById('buses');
            stopIdInput.value = '';
            busesList.innerHTML = '';
            stopNameDiv.textContent = 'Error'
        })
}