

// Role Validation for Admin Pages
(function () {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("Access Denied: Please log in first.");
        window.location.href = "login.html";
        return;
    }

    const userData = JSON.parse(localStorage.getItem(currentUser));
    if (!userData || userData.role !== '1') {
        alert("Access Denied: You do not have Administrator privileges.");
        window.location.href = "login.html";
        return;
    }
})();

function loadBooksObj() {
    var stored = localStorage.getItem('libraryBooksObj');
    return stored ? JSON.parse(stored) : { selfHelp: [], fiction: [], religious: [], science: [] };
}

function saveBooksObj(booksObj) {
    localStorage.setItem('libraryBooksObj', JSON.stringify(booksObj));
}


document.getElementById('book_image').addEventListener('change', function () {
    var file = this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('image_preview').src = e.target.result;
        document.getElementById('image_preview_wrapper').style.display = 'block';
    };
    reader.readAsDataURL(file);
});


document.getElementById('add_form').addEventListener('submit', function (e) {
    e.preventDefault();

    var id = document.getElementById('book_id').value.trim();
    var title = document.getElementById('book_name').value.trim();
    var author = document.getElementById('author').value.trim();
    var category = document.getElementById('category').value;
    var year = document.getElementById('year').value.trim();
    var copies = document.getElementById('copies').value.trim();
    var description = document.getElementById('description').value.trim();
    var imageFile = document.getElementById('book_image').files[0];


    document.getElementById('book_id_err').textContent = '';
    document.getElementById('book_name_err').textContent = '';
    document.getElementById('author_err').textContent = '';
    document.getElementById('category_err').textContent = '';
    document.getElementById('book_image_err').textContent = '';
    document.getElementById('year_err').textContent = '';
    document.getElementById('copies_err').textContent = '';
    document.getElementById('success_msg').textContent = '';

    var booksObj = loadBooksObj();
    var isValid = true;

    if (id === '') {
        document.getElementById('book_id_err').textContent = ' Book ID is required.';
        isValid = false;
    } else {
        var duplicate = false;
        for (var key in booksObj) {
            for (var i = 0; i < booksObj[key].length; i++) {
                if (booksObj[key][i].id.toLowerCase() === id.toLowerCase()) {
                    duplicate = true;
                    break;
                }
            }
        }
        if (duplicate) {
            document.getElementById('book_id_err').textContent = ' ID already exists.';
            isValid = false;
        }
    }


    if (title === '') {
        document.getElementById('book_name_err').textContent = ' Book name is required.';
        isValid = false;
    }


    if (author === '') {
        document.getElementById('author_err').textContent = ' Author is required.';
        isValid = false;
    } else {
        var validAuthor = /^[a-zA-Z\u0600-\u06FF\s.\-]+$/.test(author);
        if (!validAuthor) {
            document.getElementById('author_err').textContent = ' Author name must contain letters only.';
            isValid = false;
        }
    }


    if (category === '') {
        document.getElementById('category_err').textContent = ' Please select a category.';
        isValid = false;
    }

    if (year === '') {
        document.getElementById('year_err').textContent = ' Year of publish is required.';
        isValid = false;
    } else if (isNaN(year) || year < 1000 || year > 9999) {
        document.getElementById('year_err').textContent = ' Enter a valid year.';
        isValid = false;
    }

    if (copies === '') {
        document.getElementById('copies_err').textContent = ' Available copies is required.';
        isValid = false;
    } else if (isNaN(copies) || copies < 0) {
        document.getElementById('copies_err').textContent = ' Enter a valid number of copies.';
        isValid = false;
    }

    if (!isValid) return;

    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            saveNewBook(id, title, author, category, description, e.target.result, year, copies);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveNewBook(id, title, author, category, description, '', year, copies);
    }
});

function saveNewBook(id, title, author, category, description, image, year, copies) {
    var booksObj = loadBooksObj();

    var newBook = {
        id: id,
        title: title,
        author: author,
        cat: category,
        description: description,
        image: image,
        year: year,
        copies: copies
    };

    var key = category || 'selfHelp';
    if (!booksObj[key]) booksObj[key] = [];
    booksObj[key].unshift(newBook);
    saveBooksObj(booksObj);

    document.getElementById('success_msg').textContent = 'Book added successfully!';
    document.getElementById('add_form').reset();
    document.getElementById('image_preview_wrapper').style.display = 'none';
}
