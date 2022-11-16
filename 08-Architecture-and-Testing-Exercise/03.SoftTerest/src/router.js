export function initialize(links) {
    const main = document.getElementById('main-view');
    document.querySelector('nav').addEventListener('click', onNavigate);

    const context = {
        showSection,
        goto,
        updateNavigation
    }
    


    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(event) {
        event.preventDefault();

        let target = event.target;
        if (target.tagName == 'IMG') {
            target = target.parentElement;
        }

        if (target.tagName == 'A') {
            const url = new URL(target.href);
            goto(url.pathname);
        }
    }

    function goto(name, ...params) {
        const handler = links[name];
        debugger;
        if (typeof handler == 'function') {
            handler(context, ...params);
        }
    }

    function updateNavigation() {
        const user = sessionStorage.getItem('user');
        if (user) {
            document.querySelectorAll('.user').forEach(e => e.style.display = 'block')
            document.querySelectorAll('.guest').forEach(e => e.style.display = 'none')
        } else {
            document.querySelectorAll('.user').forEach(e => e.style.display = 'none')
            document.querySelectorAll('.guest').forEach(e => e.style.display = 'block')
        }
    }

    return context;
}