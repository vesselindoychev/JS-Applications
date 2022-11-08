document.getElementById('login-form').addEventListener('submit', loginHandler);
document.querySelectorAll('a').forEach(tag => tag.classList.remove('active'));
document.getElementById('login').classList.add('active');
document.getElementById('user').style.display = 'none';

function loginHandler(event) {
    event.preventDefault();

    // const form = event.target;
    const formData = new FormData(event.target);
    const {email, password} = Object.fromEntries(formData);
   
    onLogin(email, password);
}

async function onLogin(email, password) {
    const url = `http://localhost:3030/users/login`;
    const body = {email, password};
    const header = getHeader('post', body);
    const response = await fetch(url, header);
    const data = await response.json();
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('id', data._id);

    window.location = './index.html'
    debugger
    return data;
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}