function solution() {
    (async () => {
        try {
            let articlesRequest = await fetch(`http://localhost:3030/jsonstore/advanced/articles/list`);
            let lists = await articlesRequest.json();
            let mainSection = document.getElementById('main');
            let templateDiv = document.querySelector('.accordion');
            templateDiv.remove();
            
            lists.forEach(el => {
                let id = Object.values(el)[0];
                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
                    .then(body => body.json())
                    .then(resultData => {
                        
                        let accordionDiv = createHtmlElement(resultData.title, id, resultData.content);
                        mainSection.appendChild(accordionDiv);
                    })
            })
        } catch(error) {
            console.log(error.message);
        }

       
    })();

    function createHtmlElement(title, id, content) {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('accordion');

        let headDiv = document.createElement('div');
        headDiv.classList.add('head');

        let spanName = document.createElement('span');
        spanName.textContent = title;

        let moreBtn = document.createElement('button');
        moreBtn.classList.add('button');
        moreBtn.id = id;
        moreBtn.textContent = 'More';
        moreBtn.addEventListener('click', showInfo);

        let extraDiv = document.createElement('div');
        extraDiv.classList.add('extra');

        let extraContent = document.createElement('p');
        extraContent.textContent = content;

        headDiv.appendChild(spanName);
        headDiv.appendChild(moreBtn);

        extraDiv.appendChild(extraContent);

        mainDiv.appendChild(headDiv);
        mainDiv.appendChild(extraDiv);

        return mainDiv;
    }

    function showInfo(event) {
        let parentDiv = event.target.parentElement.parentElement;
        let hiddenInfo = parentDiv.querySelector('.extra');

        if (event.target.textContent == 'More') {
            hiddenInfo.style.display = 'block';
            event.target.textContent = 'Less';
        } else {
            hiddenInfo.style.display = 'none';
            event.target.textContent = 'More';
        }
    }
}

solution();