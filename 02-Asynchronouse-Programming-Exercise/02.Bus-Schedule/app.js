// function solve() {

//     function depart() {
//         const departBtn = document.getElementById('depart');
//         const arriveBtn = document.getElementById('arrive');
//         let nextStopId = 'depot'
//         let stopInfoSpan = document.getElementsByClassName('info')[0];
       
        
//         if (stopInfoSpan.getAttribute('current-stop-id') !== null) {
//             nextStopId = stopInfoSpan.getAttribute('current-stop-id');
//         }

//         let url = `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`

//         fetch(url)
//             .then(body => body.json())
//             .then(result => {
//                 stopInfoSpan.setAttribute('current-stop-name', result.name);
//                 stopInfoSpan.setAttribute('current-stop-id', result.next);
//                 stopInfoSpan.textContent = `Next stop ${result.name}`;
//                 departBtn.disabled = true;
//                 arriveBtn.disabled = false;
//             })
//             .catch(error => {
//                 stopInfoSpan.textContent = 'Error';
//                 departBtn.disabled = true;
//                 arriveBtn.disabled = true;
//             })
//     }

//     function arrive() {
//         let stopInfoSpan = document.getElementsByClassName('info')[0];
//         const departBtn = document.getElementById('depart');
//         const arriveBtn = document.getElementById('arrive');
//         let stopName = stopInfoSpan.getAttribute('current-stop-name');

//         stopInfoSpan.textContent = `Arriving at ${stopName}`;
//         arriveBtn.disabled = true;
//         departBtn.disabled = false;
//     }

//     return {
//         depart,
//         arrive
//     };
// }

// let result = solve();


// function solve() {
//     async function depart() {
//         let nextStopId = 'depot';
//         let departBtn = document.getElementById('depart');
//         let arriveBtn = document.getElementById('arrive');
//         let stopInfoSpan = document.getElementsByClassName('info')[0];

//         if (stopInfoSpan.getAttribute('current-stop-id') !== null) {
//             nextStopId = stopInfoSpan.getAttribute('current-stop-id');
//         }

//         const url = `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`
//         try {
//             const promise = await fetch(url);
//         const body = await promise.json();
        

//         stopInfoSpan.setAttribute('current-stop-name', body.name);
//         stopInfoSpan.setAttribute('current-stop-id', body.next);

//         stopInfoSpan.textContent = `Next stop ${body.name}`;

//         departBtn.disabled = true;
//         arriveBtn.disabled = false;
//         } catch(error) {
//             let stopInfoSpan = document.getElementsByClassName('info')[0];
//             stopInfoSpan.textContent = 'Error'

//             document.getElementById('depart').disabled = true;
//             document.getElementById('arrive').disabled = true;

//         }
//     } 

//     function arrive() {
//         let departBtn = document.getElementById('depart');
//         let arriveBtn = document.getElementById('arrive');
//         let stopInfoSpan = document.getElementsByClassName('info')[0];
//         let stopName = stopInfoSpan.getAttribute('current-stop-name');
//         stopInfoSpan.textContent = `Arriving at ${stopName}`;

//         departBtn.disabled = false;
//         arriveBtn.disabled = true;
//     }

//     return {
//         depart, 
//         arrive
//     };
// }

// let result = solve();


function solve () {
    function depart() {
        let stopNameSpan = document.getElementsByClassName('info')[0];
        let departBtn = document.getElementById('depart');
        let arriveBtn = document.getElementById('arrive');

        let nextStop = 'depot';
        

        if (stopNameSpan.getAttribute('stop-id') !== null) {
            nextStop = stopNameSpan.getAttribute('stop-id');
        }

        let url = `http://localhost:3030/jsonstore/bus/schedule/${nextStop}`;

        fetch(url)
            .then(body => body.json())
            .then(stopInfo => {
                
                stopNameSpan.setAttribute('stop-name', stopInfo.name);
                stopNameSpan.setAttribute('stop-id', stopInfo.next);

                stopNameSpan.textContent = `Next stop ${stopInfo.name}`
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(error => {
                stopNameSpan.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            })
    }

    function arrive() {
        let stopNameSpan = document.getElementsByClassName('info')[0];
        let stopName = stopNameSpan.getAttribute('stop-name');
        let departBtn = document.getElementById('depart');
        let arriveBtn = document.getElementById('arrive');

        stopNameSpan.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart, 
        arrive
    }
}

let result = solve();