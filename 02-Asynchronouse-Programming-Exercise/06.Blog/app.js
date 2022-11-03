function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', loadComments);
}

async function loadComments() {
    let selectEl = document.getElementById('posts');
    let optionText = selectEl.options[selectEl.selectedIndex].text;
    let optionValue = selectEl.value;
   
    let url = `http://localhost:3030/jsonstore/blog/comments`;
    let url2 = `http://localhost:3030/jsonstore/blog/posts`;
    let commentId = 0;
    let allComments = [];


    let request = await fetch(url);
    let commentsData = await request.json();

    for (el in commentsData) {
        let commentObj = commentsData[el];
        if (commentObj.postId === optionValue) {
            commentId = commentObj.id;
            allComments.push(commentObj.text)
        }
    }

    let request2 = await fetch(url2);
    let result = await request2.json();

    let content = ''; 

    for (el in result) {
        let post = result[el];
        if (post.id === optionValue) {
            content = post.body;
            break
        }
    }

    let commentHeading = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');
    let postedComments = document.getElementById('post-comments');

    commentHeading.textContent = optionText;
    postBody.textContent = content;

    if (postedComments.childNodes) {
        postedComments.innerHTML = '';
    }

    allComments.forEach(comment => {
        let commentLi = document.createElement('li');
        commentLi.textContent = comment;
        postedComments.appendChild(commentLi);
    })
    
    

}

async function loadPosts() {
    let url = `http://localhost:3030/jsonstore/blog/posts`;
    let postRequest = await fetch(url);
    let posts = await postRequest.json();
    let selectEl = document.getElementById('posts');

    if (selectEl.childNodes) {
        selectEl.innerHTML = '';
    }

    for (let el in posts) {
        let post = posts[el];
        let selectOption = document.createElement('option');
        selectOption.value = post.id;
        selectOption.textContent = post.title;
        selectEl.appendChild(selectOption);
    }
}

attachEvents();