//  Signup  
let suUsername = document.getElementById('su-username');

if (suUsername) {
  let form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let username = document.getElementById('su-username').value;
    let email = document.getElementById('su-email').value;
    let password = document.getElementById('su-password').value;
    let confirm = document.getElementById('su-confirm').value;

    if (username == '' || email == '' || password == '' || confirm == '') {
      alert('Please fill in all fields!');
      return;
    }

    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    let role = document.querySelector('input[name="is_admin"]:checked').value;

     
    let user = { username, email, password, role };
    localStorage.setItem(username, JSON.stringify(user));

    if (role == '1') {
      window.location.href = 'admin_book_list.html';
    } else {
      window.location.href = 'user_book_list.html';
    }
  });
}

//  Login 
let loginUsername = document.getElementById('login-username');

if (loginUsername) {
  let form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    if (username == '' || password == '') {
      alert('Please fill in all fields!');
      return;
    }

    let storedUser = localStorage.getItem(username);

    if (storedUser == null) {
      alert('Account not found! Please sign up first.');
      return;
    }

    let userData = JSON.parse(storedUser);

    if (userData.password !== password) {
      alert('Wrong password!');
      return;
    }

    if (userData.role == '1') {
      window.location.href = 'admin_book_list.html';
    } else {
      window.location.href = 'user_book_list.html';
    }
  });
}