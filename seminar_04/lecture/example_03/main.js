var gitHubLink = document.querySelector('.github');
gitHubLink.addEventListener('click', gitHubHandler);

function gitHubHandler() {
    alert('clicked on ' + this.tagName)
};