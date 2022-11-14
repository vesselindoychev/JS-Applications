import { showAddMovieView } from "./addMovieView.js";
import { showMovieDetails } from "./movieDetailsView.js";


document.getElementById('home-link').addEventListener('click', showHomeView);
document.querySelector('.btn.btn-warning').addEventListener('click', showAddMovieView);

export async function showHomeView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    const movies = await getMovies();
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('movie').style.display = 'block';

    const token = sessionStorage.getItem('accessToken');
    if (token) {
        document.getElementById('add-movie-button').style.display = 'block'
    }
    displayMovies(movies)
}


async function getMovies() {
    const url = `http://localhost:3030/data/movies`;
    const response = await fetch(url);
    const data = await response.json();
    // createMovieCard(data);
    return data;
}

function displayMovies(movies) {
    const cards = movies.map(createMovieCard);
    const movieCardFragment = document.createDocumentFragment();

    for (let card of cards) {
        movieCardFragment.appendChild(card);
    }

    const moviesList = document.getElementById('movies-list');
    moviesList.replaceChildren(movieCardFragment);
    debugger;

}

function createMovieCard(movie) {


    let btn = document.createElement('button');
    btn.textContent = 'Details';
    btn.setAttribute('ownerId', movie._ownerId);
    btn.setAttribute('movieId', movie._id);
    btn.addEventListener('click', showMovieDetails);
    let li = document.createElement('li');
    li.innerHTML = `
        <div><img src="${movie.img}" /></div>
        <h1>${movie.title}</h1>
        `
    li.appendChild(btn);

    return li;
}