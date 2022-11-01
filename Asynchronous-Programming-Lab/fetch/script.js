document.getElementById('load-info').addEventListener('click', loadInfo);

function loadInfo(event) {
    let baseUrl = 'https://api.github.com/users/testnakov/repos';

    fetch(baseUrl)
        .then((response) => response.json())
        .then((info) => console.log(info))
}