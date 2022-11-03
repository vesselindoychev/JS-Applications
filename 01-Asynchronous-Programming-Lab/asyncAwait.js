async function loadRepos() {
    try { 
        const username = document.getElementById('username').value;

        const response = fetch(`https://api.github.com/users/${username}/repos`);

        if (response.ok == false) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json()
        
        const list = document.getElementById('repos');  
        
        const items = data.map(repo => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = repo.html_url;
            a.textContent = repo.full_name;
            li.appendChild(a);

            return li;
        })
        
        list.replaceChildren(...items);
    } catch {
        const list = document.getElementById('repos');
	    list.textContent = error.message;
    }       
}