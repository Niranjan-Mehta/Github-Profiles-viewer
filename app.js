const baseUrl = "https://api.github.com/users";
const button = document.getElementById("search");

const statsArea = document.querySelector(".stats");
const name = document.querySelector(".profile-card h2");
const bio = document.querySelector(".profile-card p");
const image = document.querySelector(".profile-card img");
const stats = document.querySelectorAll(".stat-box h3");

const searchProfile = async () => {
  try {
    let searchName = document.getElementById("userName").value;
    if (searchName.trim() === "") {
      alert("Enter username");
      return;
    }
    const response = await fetch(`${baseUrl}/${searchName}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    name.textContent = data.name;
    bio.textContent = data.bio;
    image.src = data.avatar_url;

    stats[0].textContent = data.public_repos;
    stats[1].textContent = data.followers;
    stats[2].textContent = data.following;
  } catch (error) {
    name.textContent = "User Not Found";
    bio.textContent = "Please try another username";
    image.src = "https://avatars.githubusercontent.com/u/9919?v=4";
    statsArea.style.display = "none";
  }
};

button.addEventListener("click", (event) => {
  event.preventDefault();
  searchProfile();
});
