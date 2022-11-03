function lockedProfile() {
    (async () => {
        let profileRequest = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);
        let profilesData = await profileRequest.json();
        
        let mainElement = document.getElementById('main');
        let firstProfileDiv = document.querySelector('.profile');
        mainElement.removeChild(firstProfileDiv);

        Object.keys(profilesData).forEach((key, index) => {
            let profileInfo = profilesData[key];
            let userIndex = index + 1;
            let profileHtmlDivElement = createHtmlElement(userIndex, profileInfo.username, profileInfo.email,
                profileInfo.age);
            mainElement.appendChild(profileHtmlDivElement);

        })
    })();

    function createHtmlElement(userIndex, username, email, age) {
        let profileMainDiv = document.createElement('div');
        profileMainDiv.setAttribute('class', 'profile');

        let userImage = document.createElement('img');
        userImage.src = './iconProfile2.png';
        userImage.setAttribute('class', 'userIcon');

        let lockLabel = document.createElement('label');
        lockLabel.textContent = 'Lock';

        let lockRadio = document.createElement('input');
        lockRadio.setAttribute('type', 'radio');
        lockRadio.setAttribute('name', `user${userIndex}Locked`);
        lockRadio.setAttribute('value', 'lock');
        lockRadio.checked = true;

        let unlockLabel = document.createElement('label');
        unlockLabel.textContent = 'Unlock';

        let unlockRadio = document.createElement('input');
        unlockRadio.setAttribute('type', 'radio');
        unlockRadio.setAttribute('name', `user${userIndex}Locked`);
        unlockRadio.setAttribute('value', 'unlock');

        let brTag = document.createElement('br');
        let hrTag = document.createElement('hr');

        let usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username';

        let usernameInput = document.createElement('input');
        usernameInput.setAttribute('type', 'text');
        usernameInput.setAttribute('name', `user${userIndex}Username`);
        usernameInput.setAttribute('value', `${username}`);
        usernameInput.disabled = true;
        usernameInput.readOnly = true;

        let hiddenFieldsDiv = document.createElement('div');
        hiddenFieldsDiv.setAttribute('id', `user${userIndex}HiddenFields`)
        hiddenFieldsDiv.style.display = 'none'

        let hiddenHrTag = document.createElement('hr');

        let hiddenEmailLabel = document.createElement('label');
        hiddenEmailLabel.textContent = 'Email:';

        let hiddenEmailInput = document.createElement('input');
        hiddenEmailInput.setAttribute('type', 'email');
        hiddenEmailInput.setAttribute('name', `user${userIndex}Email`);
        hiddenEmailInput.setAttribute('value', `${email}`);
        hiddenEmailInput.disabled = true;
        hiddenEmailInput.readOnly = true;

        let hiddenAgeLabel = document.createElement('label');
        hiddenAgeLabel.textContent = 'Age:';

        let hiddenAgeInput = document.createElement('input');
        hiddenAgeInput.type = 'email';
        hiddenAgeInput.name = `user${userIndex}Age`;
        hiddenAgeInput.value = `${age}`;
        hiddenAgeInput.disabled = true;
        hiddenAgeInput.readOnly = true;

        let showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show more';
        showMoreButton.addEventListener('click', showHiddenInfo);
        
        hiddenFieldsDiv.appendChild(hiddenHrTag);
        hiddenFieldsDiv.appendChild(hiddenEmailLabel);
        hiddenFieldsDiv.appendChild(hiddenEmailInput);
        hiddenFieldsDiv.appendChild(hiddenAgeLabel);
        hiddenFieldsDiv.appendChild(hiddenAgeInput);

        profileMainDiv.appendChild(userImage);
        profileMainDiv.appendChild(lockLabel);
        profileMainDiv.appendChild(lockRadio);
        profileMainDiv.appendChild(unlockLabel);
        profileMainDiv.appendChild(unlockRadio);
        profileMainDiv.appendChild(brTag);
        profileMainDiv.appendChild(hrTag);
        profileMainDiv.appendChild(usernameLabel);
        profileMainDiv.appendChild(usernameInput);
        profileMainDiv.appendChild(hiddenFieldsDiv);
        profileMainDiv.appendChild(showMoreButton);

        return profileMainDiv;
    }

    function showHiddenInfo(event) {
        let parentDivElement = event.target.parentElement;
        let hiddenDiv = parentDivElement.querySelector('div');

        
        let unlockRadio = parentDivElement.querySelectorAll('input')[1];

        if (event.target.textContent == 'Show more') {
            if (unlockRadio.checked) {
                hiddenDiv.style.display = 'inline'
                event.target.textContent = 'Hide it'
            }
        } else {
            if (unlockRadio.checked) {
                hiddenDiv.style.display = 'none';
                event.target.textContent = 'Show more';
            }
        }

        
        
    }
    
}