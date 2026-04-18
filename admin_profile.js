const form = document.getElementById("profileForm");

let currentUsername = localStorage.getItem("currentUser");

if (!currentUsername) {
  alert("You have to login first");
  window.location.href = "login.html";
 }

let userData = JSON.parse(localStorage.getItem(currentUsername));

const booklistLink = document.getElementById("booklistLink");

if (booklistLink && userData) {
  if (userData.role == 1) {
    booklistLink.href = "admin_book_list.html";
  } else {
    booklistLink.href = "user_book_list.html";
  }
}

if (userData) {
  document.getElementById("name").value = userData.fullName || userData.username;
  document.getElementById("email").value = userData.email;
  document.getElementById("username").value = userData.username;
  document.getElementById("password").value = userData.password;
  document.getElementById("role").value = userData.role == 1 ? "Admin" : "User";}

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

  alert("Your profile has been updated");
});