export function checkUserNav() {
    const token = sessionStorage.getItem('accessToken');
    let welcomeMsg = document.getElementById('welcome-msg');
    if (token) {
        [...document.querySelectorAll('.nav-item.guest')].forEach(el => el.style.display = 'none');
        [...document.querySelectorAll('.nav-item.user')].forEach(el => el.style.display = 'inline');
        welcomeMsg.textContent = `Welcome, ${sessionStorage.getItem('email')}`;
    } else {
        [...document.querySelectorAll('.nav-item.guest')].forEach(el => el.style.display = 'inline');
        [...document.querySelectorAll('.nav-item.user')].forEach(el => el.style.display = 'none');
    }
}