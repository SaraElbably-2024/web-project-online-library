const form = document.getElementById("profileForm");

const currentUsername = localStorage.getItem("currentUser");

if (!currentUsername) {
  alert("No user logged in");
  window.location.href = "index.html";
}

const userData = JSON.parse(localStorage.getItem(currentUsername));

if (userData) {
  document.getElementById("name").value = userData.username;
  document.getElementById("email").value = userData.email;
  document.getElementById("username").value = userData.username;
  document.getElementById("password").value = userData.password;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedUser = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: userData.role
  };

  localStorage.removeItem(currentUsername);
  localStorage.setItem(updatedUser.username, JSON.stringify(updatedUser));
  localStorage.setItem("currentUser", updatedUser.username);

  alert("Profile updated successfully!");
});