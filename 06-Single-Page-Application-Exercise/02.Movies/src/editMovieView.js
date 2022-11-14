
// .addEventListener('submit', onEditMovie);

export async function showEditMovieView(event) {
    const form = document.getElementById('edit-movie-form');
    console.log(form);
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    document.getElementById('edit-movie').style.display = 'block';
    console.log(event.target.parentElement);
    console.log(event.target.getAttribute('movieId'))
    const movieId = event.target.getAttribute('movieId')

    const response = await fetch(`http://localhost:3030/data/movies/${movieId}`);
    const data = await response.json();
    console.log(data);
    
    let formTitle = form.getElementById('title');
    let formDesc = form.querySelector('textarea');
    let formImg = form.getElementById('imageUrl');

    formTitle.value = data.title;
    formDesc.value = data.description;
    formImg.value = data.img;


}

async function onEditMovie(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const {title, description, img} = Object.fromEntries(formData);

}

function getData() {
    // fetch url;
    // take movieId;

    // display form page
}