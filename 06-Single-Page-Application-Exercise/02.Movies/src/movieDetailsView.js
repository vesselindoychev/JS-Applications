import { showEditMovieView } from "./editMovieView.js";

const movieDetailPage = document.getElementById('movie-example');

export async function showMovieDetails(event) {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    await renderMovieDetails(event);
    movieDetailPage.style.display = 'block';
    
}

async function renderMovieDetails(event) {
    const userId = sessionStorage.getItem('userId')
    const id = event.target.getAttribute('movieId');
    const url = `http://localhost:3030/data/movies/${id}`
    const response = await fetch(url);
    const data = await response.json();

    const movieDetailsFragment = document.createDocumentFragment();
    
    const div = document.createElement('div');
    div.classList.add('container');

    div.innerHTML = `
    
        <div class="row bg-light text-dark">
          <h1>Movie title: ${data.title}</h1>

          <div class="col-md-8">
            <img class="img-thumbnail" src="${data.img}"
              alt="Movie" />
          </div>
          <div class="col-md-4 text-center">
            <h3 class="my-3">Movie Description</h3>
            <p>${data.description}</p>
            <a id="delete-details-movie-page" class="btn btn-danger" href="#">Delete</a>
            <a id="edit-details-movie-page" class="btn btn-warning" href="#">Edit</a>
            <a class="btn btn-primary" href="#">Like</a>
            <span class="enrolled-span">Liked 1</span>
          </div>
        </div>
      `;
    movieDetailsFragment.appendChild(div);
    movieDetailPage.replaceChildren(movieDetailsFragment);

    let deleteDetailsBtn = document.getElementById('delete-details-movie-page');
    
    let editDetailsBtn = document.getElementById('edit-details-movie-page');
    editDetailsBtn.setAttribute('movieId', id);
    editDetailsBtn.addEventListener('click', showEditMovieView)

    if (event.target.getAttribute('ownerId') != userId) {
        deleteDetailsBtn.style.display = 'none';
        editDetailsBtn.style.display = 'none';
    }

}

