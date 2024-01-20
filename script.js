let currentPage = 1;
let perPage = 10;
let username = "freeCodeCamp"; 

function getRepos(page) {
    // Construct the API URL with the page and per_page parameters
    let url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

    // Make the API call
    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            $('#repoList').empty();
            // Append new repos to #repoList
            data.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.className = 'col-sm-6 repo-box';
                repoDiv.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description}</p>
                    <p>Language: ${repo.language}</p>
                    <p>URL: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
                `;
                $('#repoList').append(repoDiv);
            });
        })
        .catch(error => console.error(error));
}

// Call the getRepos function with the initial page number
getRepos(currentPage);

// Pagination Handlers
$('#olderPage').click(function() {
    if (currentPage > 1) {
        currentPage--;
        getRepos(currentPage);
    }
});

$('#newerPage').click(function() {
    currentPage++;
    getRepos(currentPage);
});
