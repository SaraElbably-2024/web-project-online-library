const form = document.getElementById("profileForm");

let currentUsername = localStorage.getItem("currentUser");

if (!currentUsername) {
  alert("Security Alert: No active session found. Redirecting to login...");
  window.location.href = "login.html";
}

let userData = JSON.parse(localStorage.getItem(currentUsername));

if (!userData || userData.role !== '1') {
    alert("Access Denied: You do not have Administrator privileges.");
    window.location.href = "login.html";
}

if (userData) {
  document.getElementById("name").value = userData.fullName || userData.username;
  document.getElementById("email").value = userData.email;
  document.getElementById("username").value = userData.username;
  document.getElementById("password").value = userData.password;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newUsername = document.getElementById("username").value.trim();
  const newEmail = document.getElementById("email").value.trim();
  const newPassword = document.getElementById("password").value;
  const newFullName = document.getElementById("name").value.trim();

  if (!newUsername || !newEmail || !newPassword) {
    alert("Please fill in all required fields.");
    return;
  }

  const updatedUser = {
    username: newUsername,
    email: newEmail,
    password: newPassword,
    fullName: newFullName,
    role: userData.role
  };

  if (newUsername !== currentUsername) {
    if (localStorage.getItem(newUsername)) {
      alert("This username is already taken. Please choose another one.");
      return;
    }
    localStorage.removeItem(currentUsername);
  }

  localStorage.setItem(newUsername, JSON.stringify(updatedUser));
  localStorage.setItem("currentUser", newUsername);

  currentUsername = newUsername;

  alert("Success: Your profile has been updated smoothly!");
});