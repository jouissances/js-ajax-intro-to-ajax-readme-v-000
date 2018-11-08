function getRepositories() {
    const request = new XMLHttpRequest();
    request.addEventListener('load', showRepositories);
    request.open('GET', 'https://api.github.com/users/octocat/repos');
    request.send();
}

function showRepositories() {
    //`this` is set to the XMLHttpRequest object that fired the event
    let repos = JSON.parse(this.responseText);    
    let commitOne = '<a href="#" data-repo="'
    let commitTwo = '" onclick="getCommits(this)">Get Commits</a>'
    // console.log(repos)
    let repoList = `<ul>${repos.map(repo => '<li>' + repo.name + commitOne + repo.name + commitTwo + '</li>').join('')}</ul>`

    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
    const name = el.dataset.repo;
    const request = new XMLHttpRequest();
    request.addEventListener('load', showCommits);
    request.open('GET', `https://api.github.com/repos/octocat/${name}/commits`);
    request.send();
}

function showCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => `<li>${commit.author.login} - ${commit.commit.message}</li>`).join('')}</ul>`

    document.getElementById('commits').innerHTML = commitsList;
}