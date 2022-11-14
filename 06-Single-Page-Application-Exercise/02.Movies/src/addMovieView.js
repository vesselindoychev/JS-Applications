import { checkUserNav } from "./auth.js";
import { showHomeView } from "./homeView.js";


document.getElementById('add-movie-form').addEventListener('submit', onCreateMovie);

export function showAddMovieView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    document.getElementById('add-movie').style.display = 'block';
}

async function onCreateMovie(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {title, description, img} = Object.fromEntries(formData);

    if (!title || !description || !img) {
        alert('Invalid movie data!')
    } else {
        await createMovieCard(title, description, img);
        checkUserNav();
        showHomeView();
    }
}

async function createMovieCard(title, description, img) {
    const token = sessionStorage.getItem('accessToken')
    const url = `http://localhost:3030/data/movies`;
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({title, description, img})
    })

    const data = await response.json();
    return data;
}