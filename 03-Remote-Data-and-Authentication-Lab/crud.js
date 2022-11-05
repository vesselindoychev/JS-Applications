let list = document.getElementById('comments');

init();

function init() {
    document.getElementById('load').addEventListener('click', getComments);
    document.getElementById('comment-form').addEventListener('submit', onPost);
    list.addEventListener('click', onCommentClick);
    

    getComments();
}

async function onPost(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const {name, content} = Object.fromEntries(formData.entries());

    const result = await postComment({ content });
    list.prepend(createCommentCard(result));

}


function displayComments(comments) {
    list.replaceChildren(...comments.map(createCommentCard));

}

function  createCommentCard(comment) {
    const userId = sessionStorage.getItem('userId');
    
    let element = document.createElement('article');
    element.innerHTML = `<header><h3>${comment.author.username}</h3></header>
    <main><p>${comment.content}</p>`;

    if (comment._ownerId == userId) {
        element.innerHTML += `<button id="delete">Delete Comment</button><br><button id="edit">Edit Comment</button></main>`
    }
    element.id = comment._id;
    return element;
}

async function getComments() {
    // const response = await fetch(`http://localhost:3030/jsonstore/comments`);
    const response = await fetch(`http://localhost:3030/data/comments?load=author%3D_ownerId%3Ausers`);
    const data = await response.json();
    const comments =  Object.values(data).reverse();
    displayComments(comments); 
}

async function postComment(comment) {
    const token = sessionStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:3030/data/comments`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(comment)
    });

    const data = await response.json();
    return data;
}



function onCommentClick(event) {
    let commentId = event.target.parentElement.parentElement.id;
    let commentText = event.target.parentElement.querySelector('p');
    // contentInput.value = commentText;
    
    if (event.target.tagName == 'BUTTON' && event.target.id == 'delete') {
        const choice = confirm('Are you sure you want to delete this comment?');
        if (choice) {

            deleteComment(commentId);
        }
    // } else if (event.target.tagName == 'BUTTON' && event.target.id == 'edit') { 
    //    const choice = confirm('Are you sure you want to edit this comment?')
    //    if (choice) {

    //     updateComment(commentId);
    //    }
    }
}

async function deleteComment(id) {
    const token = sessionStorage.getItem('accessToken');
    await fetch(`http://localhost:3030/data/comments/${id}`, {
        method: 'delete',
        headers: {
            'X-Authorization': token
        }
    });
    document.getElementById(id).remove();
}

async function updateComment(id, comment) {
    const response = await fetch(`http://localhost:3030/jsonstore/comments/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    return response.json();
    
}
