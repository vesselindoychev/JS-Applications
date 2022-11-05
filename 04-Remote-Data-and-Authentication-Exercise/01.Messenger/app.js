function attachEvents() {
    let refreshBtn = document.getElementById('refresh');
    let sendBtn = document.getElementById('submit');

    refreshBtn.addEventListener('click', loadMessages);
    sendBtn.addEventListener('click', postMessage);
}

function renderMessage(data) {
    let messageChat = document.getElementById('messages');
    let messagesArray = [];
    if (messageChat.textContent.length > 0) {
        messageChat.textContent = '';
    }
    for (let obj of Object.values(data)) {
        messagesArray.push(`${obj.author}: ${obj.content}`)
    }
    messageChat.textContent += messagesArray.join('\n');
}

async function loadMessages() {
    const response = await fetch(`http://localhost:3030/jsonstore/messenger`);
    const data = await response.json();
    renderMessage(data);    
}

async function onPost(author, content) {
        
    const response = await fetch(`http://localhost:3030/jsonstore/messenger`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, content}) 
    }) 
    // either loadMessages() or this syntax under the function
    loadMessages()
    // const data = await response.json();
    // return data;    
}

function postMessage() {
    let nameInput = document.getElementsByName('author')[0];
    let messageInput = document.getElementsByName('content')[0];
    author = nameInput.value;
    content = messageInput.value;

    onPost(author, content);
    nameInput.value = '';
    messageInput.value = '';
}

attachEvents();