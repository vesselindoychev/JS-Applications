document.getElementById('register-form').addEventListener('submit', registerHandler);
document.querySelectorAll('a').forEach(tag => tag.classList.remove('active'));
document.getElementById('register').classList.add('active');
document.getElementById('user').style.display = 'none';
const errorP = document.querySelector('p.notification');

function registerHandler(event) {
    event.preventDefault();
    // TODO validations passwords and email not only passwords!
    const form = event.target;
    const formData = new FormData(form);
    const {email, password, rePass} = Object.fromEntries(formData.entries());

    if (password !== rePass || !email) {
            errorP.textContent = 'Error';
            setTimeout(() => {
                errorP.textContent = '';
            }, 1000)
    } else {
        onRegister(email, password);
    }

    
}

async function onRegister(email, password) {
    // TODO error handling
    const url = `http://localhost:3030/users/register`;
    
    const body = {email, password};
    const header = getHeader('post', body);
    try {
        const response = await fetch(url, header);
        const data = await response.json();
        if (data.code && data.code !== 200) {
            throw new Error(data.message);
        }
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('id', data._id);
        window.location = './index.html'
        return data;
    } catch(error) {
        errorP.text = error;
        setTimeout(() => {
            errorP.textContent = '';
        }, 1000)

    }
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