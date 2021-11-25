const toggleStatus = document.querySelector(".toggle-status");
const bw_toggle = document.querySelector(".icon-toggle");

function changeTheme() {
  if (toggleStatus.innerHTML == "DARK") {
    toggleStatus.innerHTML = "LIGHT";
    bw_toggle.src = "./assets/icon-moon.svg";

    document.querySelector("body").style.backgroundColor = "#f6f8ff";

    document.querySelector(".search").style.backgroundColor = "#fefefe";
    document.querySelector(".profile-card").style.backgroundColor = "#fefefe";

    document.querySelector(".search").style.boxShadow =
      "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
    document.querySelector(".profile-card").style.boxShadow =
      "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

    document.querySelector(".profile-status").style.backgroundColor = "#f6f8ff";
    document.querySelectorAll("h3").forEach((child) => {
      child.style.color = "#2b3442";
    });
    document.querySelectorAll("h1").forEach((child) => {
      child.style.color = "#2b3442";
    });
  } else if (toggleStatus.innerHTML == "LIGHT") {
    toggleStatus.innerHTML = "DARK";
    bw_toggle.src = "./assets/icon-sun.svg";

    document.querySelector("body").style.backgroundColor = "#141c2f";

    document.querySelector(".search").style.backgroundColor = "#141c2f";
    document.querySelector(".profile-card").style.backgroundColor = "#141c2f";

    document.querySelector(".search").style.boxShadow =
      "0px 16px 30px -10px rgba(0, 0, 0, 0.2)";
    document.querySelector(".profile-card").style.boxShadow =
      "0px 16px 30px -10px rgba(0, 0, 0, 0.2)";
    document.querySelector(".profile-status").style.backgroundColor = "#141c2f";
    document.querySelectorAll("h3").forEach((child) => {
      child.style.color = "#fefefe";
    });
    document.querySelectorAll("h1").forEach((child) => {
      child.style.color = "#fefefe";
    });
  }
}

async function getGithubUser(user) {
  try {
    await fetch("https://api.github.com/users/" + user + "")
      .then((response) => response.json())
      .then((data) => user_info(data));
  } catch (error) {
    console.error(error);
  }
}

function user_info(data) {
  info = [
    data["avatar_url"],
    data["name"],
    data["html_url"],

    "Joined " + new Date(data["created_at"]).toDateString(),
    data["bio"],
    data["public_repos"],
    data["followers"],
    data["following"],
    data["location"],
    data["twitter_username"],
    data["blog"],
    data["company"],
  ];

  var profile_info = document.querySelectorAll(
    ".github-icon,.profile-name,.profile-link>a,.profile-created,  .bio,  .repo,  .follower,  .following,  .location>h3,  .twitter>h3, .blog>h3>a,  .company>h3"
  );

  for (let i = 0; i < profile_info.length; i++) {
    if (info[i] === null || info[i] === "") {
      if (i != 4) {
        profile_info[i].innerHTML = "Not Available";
      } else {
        profile_info[i].innerHTML = "This profile has no bio.";
      }

      profile_info[i].style.opacity = "0.5";
      profile_info[i].style.decoration = "none";
    } else {
      if (i == 0) {
        profile_info[i].src = info[i];
      }
      if (i == 1) {
        profile_info[i].innerHTML = info[i];
      }
      if (i == 2) {
        profile_info[i].href = info[i];
        profile_info[i].innerHTML = "@" + info[i].split("/").slice(-1);
      }
      if (i > 2) {
        profile_info[i].innerHTML = info[i];
        if (i == 10) {
          profile_info[i].innerHTML = info[i];
          profile_info[i].href = info[i];
        }
      }
    }
  }
}

const form = document.getElementById("search");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const user = form.elements["user"].value;
  getGithubUser(user);
});
