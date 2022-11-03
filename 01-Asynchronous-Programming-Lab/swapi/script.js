document.getElementById('load-character').addEventListener('click', loadCharacter);

function loadCharacter(event) {
    let baseUrl = 'https://swapi.dev/api/';

    fetch(`${baseUrl}/people/1`)
        .then((response) => response.json())
        .then((character) => {
            console.log(character);
        })
        .catch(error => {
            console.log('rejected: ' + error);
        })
}