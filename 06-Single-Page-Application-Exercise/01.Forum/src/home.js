import { showDetails } from "./details.js";

const section = document.getElementById('homeView');
const main = document.getElementsByTagName('main')[0];
const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
const form = document.querySelector('#homeView form');
form.addEventListener('submit', onSubmit);

section.remove();

export function showHome() {
    // const topicContainer = section.getElementsByClassName('topic-title')[0];
    // const posts = await loadPost();

    // const content = Object.values(posts).map(el => topicTemplate(el));
    // topicContainer.replaceChildren(...content);
    displayContent();
    main.replaceChildren(section);
}

async function displayContent() {
    const topicContainer = section.getElementsByClassName('topic-title')[0];
    const posts = await loadPost();

    const content = Object.values(posts).map(el => topicTemplate(el));
    topicContainer.replaceChildren(...content.reverse());
}

function topicTemplate(data) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('topic-container');
    divContainer.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal"  id="${data._id}">
                <h2>${data.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${data.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    divContainer.querySelector('a').addEventListener('click', showDetails);
    return divContainer;
}

function onSubmit(event) {
    event.preventDefault();

    if (event.submitter.innerHTML == 'Cancel') {
        return clearData();
    }

    const formData = new FormData(event.target);
    const { topicName, username, postText } = Object.fromEntries(formData);

    if (!topicName || !username || !postText) {
        return clearData();
    }
    
    createPost({ topicName, username, postText, date: new Date() });
    clearData();
    displayContent();

}

function clearData() {
    form.reset();
}

async function createPost(body) {
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    return data;
}

async function loadPost() {
    const response = await fetch(url);
    const data = await response.json()
    return data;

}

showDetails();