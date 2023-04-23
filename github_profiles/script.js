const API_URL = "https://api.github.com/users/";

/**
 * This function fetches user data and repositories from an API and displays them, or throws an error
 * if the user is not found.
 * @param username - The username of the user whose profile data is being fetched.
 */
async function fetchProfileData(username) {
  try {
    const response = await fetch(API_URL + username);
    const data = await response.json();
    if (data.message === "Not Found") {
      throw "User can not be found";
    } else {
      displayUserData(data);
      fetchRepos(data);
    }
  } catch (error) {
    alert(error);
  }
}

/**
 * This function fetches a user's repositories from their GitHub API endpoint and displays them.
 * @param userData - The `userData` parameter is an object that contains information about a user,
 * including their repositories URL.
 */
async function fetchRepos(userData) {
  try {
    const response = await fetch(userData.repos_url);
    const repos = await response.json();
    displayRepos(repos);
  } catch (error) {
    console.log(error);
  }
}

/* This code is selecting the HTML elements with the IDs "search-btn" and "user-input" and adding an
event listener to the "search-btn" button. When the button is clicked, it gets the value of the
"user-input" field, clears the field, and passes the value to the `fetchProfileData` function to
fetch and display the user's profile data and repositories. */
const searchBtn = document.getElementById("search-btn");
const userInput = document.getElementById("user-input");
searchBtn.addEventListener("click", () => {
  const username = userInput.value;
  userInput.value = "";
  fetchProfileData(username);
});

/**
 * The function displays user data, including their username, avatar, bio, follower/following count,
 * and number of public repositories.
 * @param data - an object containing user data, including login, avatar_url, bio, html_url, followers,
 * following, and public_repos.
 */
function displayUserData(data) {
  const userCard = document.getElementById("container");
  const avatarURL = data.avatar_url;
  const bio = data.bio ? data.bio : "";
  const user = data.name || data.login

  userCard.innerHTML = `
        <div class="img-card">
            <img id="avatar" src="${avatarURL}"></img>
        </div>
        <div class="info-card">
            <h2> ${user} </h2>
            <p id="bio"> ${bio} </p>
            <div class="stats">
                <p> ${data.followers} Followers </p>
                <p> ${data.following} Following </p>
                <p> ${data.public_repos} Repos </p>
            </div>
            <div id="repos"></div>
        `;
}

/**
 * The function displays a list of repositories as clickable links on a webpage.
 * @param repos - The parameter `repos` is an array of objects representing GitHub repositories. Each
 * object contains information about a single repository, such as its name, URL, and other metadata.
 * The `displayRepos` function takes this array as input and generates HTML elements to display the
 * repositories on a webpage.
 */
function displayRepos(repos) {
  const div = document.getElementById("repos");
  repos.forEach((repo) => {
    const repoLink = document.createElement("a");

    repoLink.classList.add("repo")
    repoLink.href = repo.html_url;
    repoLink.target = "_blank";
    repoLink.innerText = repo.name;
    div.appendChild(repoLink);
  });
}
