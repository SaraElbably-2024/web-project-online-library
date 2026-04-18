
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


document.getElementById('edit_book_image').addEventListener('change', function () {
    var file = this.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('new_image_preview').src = e.target.result;
        document.getElementById('new_image_preview_wrapper').style.display = 'block';
    };
    reader.readAsDataURL(file);
});


document.getElementById('search_form').addEventListener('submit', function (e) {
    e.preventDefault();

    var q = document.getElementById('search_query').value.trim().toLowerCase();

    document.getElementById('search_query_err').textContent = "";
    document.getElementById('success_msg').textContent = "";

    document.getElementById('edit_book_id').value = "";
    document.getElementById('edit_book_name').value = "";
    document.getElementById('edit_author_name').value = "";
    document.getElementById('edit_category').value = "selfHelp";
    document.getElementById('edit_year').value = "";
    document.getElementById('edit_copies').value = "";
    document.getElementById('edit_descri').value = "";
    document.getElementById('current_image_wrapper').style.display = 'none';
    document.getElementById('new_image_preview_wrapper').style.display = 'none';
    document.getElementById('edit_book_image').value = "";

    if (q === "") {
        document.getElementById('search_query_err').textContent = " Please enter a Book ID or name.";
        return;
    }

    var booksObj = loadBooksObj();
    var foundBook = null;
    var foundCategoryKey = null;

    outer: for (var key in booksObj) {
        for (var book of booksObj[key]) {
            if (book.id.toLowerCase() === q || book.title.toLowerCase().includes(q)) {
                foundBook = book;
                foundCategoryKey = key;
                break outer;
            }
        }
    }

    if (!foundBook) {
        document.getElementById('search_query_err').textContent = " No book found with that ID or name.";
        return;
    }

    document.getElementById('edit_form').setAttribute('data-old-category', foundCategoryKey);
    document.getElementById('edit_book_id').value = foundBook.id;
    document.getElementById('edit_book_name').value = foundBook.title;
    document.getElementById('edit_author_name').value = foundBook.author;

    var catVal = foundBook.cat || foundBook.category;
    if (catVal) {
        var options = document.getElementById('edit_category').options;
        for (var o = 0; o < options.length; o++) {
            if (options[o].value.toLowerCase() === catVal.toLowerCase() || options[o].value === foundCategoryKey) {
                document.getElementById('edit_category').selectedIndex = o;
                break;
            }
        }
    }

    document.getElementById('edit_year').value = foundBook.year || '';
    document.getElementById('edit_copies').value = foundBook.copies || '';
    document.getElementById('edit_descri').value = foundBook.description || '';

    if (foundBook.image) {
        document.getElementById('current_image_preview').src = foundBook.image;
        document.getElementById('current_image_wrapper').style.display = 'block';
    }
});


document.getElementById('edit_form').addEventListener('submit', function (e) {
    e.preventDefault();

    var id = document.getElementById('edit_book_id').value.trim();
    var title = document.getElementById('edit_book_name').value.trim();
    var author = document.getElementById('edit_author_name').value.trim();
    var cat = document.getElementById('edit_category').value;
    var year = document.getElementById('edit_year').value.trim();
    var copies = document.getElementById('edit_copies').value.trim();
    var descri = document.getElementById('edit_descri').value.trim();
    var imageFile = document.getElementById('edit_book_image').files[0];
    var oldCategoryKey = this.getAttribute('data-old-category');

    document.getElementById('edit_book_name_err').textContent = "";
    document.getElementById('edit_author_name_err').textContent = "";
    document.getElementById('edit_year_err').textContent = "";
    document.getElementById('edit_copies_err').textContent = "";
    document.getElementById('success_msg').textContent = "";

    if (id === "") {
        alert("Please search for a book first.");
        return;
    }

    var isValid = true;
    var booksObj = loadBooksObj();

    if (title === "") {
        document.getElementById('edit_book_name_err').textContent = " Book name is required.";
        isValid = false;
    } else {
        var isDuplicate = false;
        for (var key in booksObj) {
            for (var i = 0; i < booksObj[key].length; i++) {
                if (booksObj[key][i].title.toLowerCase() === title.toLowerCase() && booksObj[key][i].id !== id) {
                    isDuplicate = true;
                    break;
                }
            }
        }
        if (isDuplicate) {
            document.getElementById('edit_book_name_err').textContent = " This book name already exists.";
            isValid = false;
        }
    }

    if (author === "") {
        document.getElementById('edit_author_name_err').textContent = " Author is required.";
        isValid = false;
    } else {
        var validAuthor = /^[a-zA-Z\u0600-\u06FF\s.\-]+$/.test(author);
        if (!validAuthor) {
            document.getElementById('edit_author_name_err').textContent = " Author name must contain letters only.";
            isValid = false;
        }
    }

    if (year === '') {
        document.getElementById('edit_year_err').textContent = ' Year of publish is required.';
        isValid = false;
    } else if (isNaN(year) || year < 1000 || year > 9999) {
        document.getElementById('edit_year_err').textContent = ' Enter a valid year.';
        isValid = false;
    }

    if (copies === '') {
        document.getElementById('edit_copies_err').textContent = ' Available copies is required.';
        isValid = false;
    } else if (isNaN(copies) || copies < 0) {
        document.getElementById('edit_copies_err').textContent = ' Enter a valid number of copies.';
        isValid = false;
    }

    if (!isValid) return;

    function handleImageUpdate(file, onSuccess) {
        if (!file) return onSuccess(null);
        const reader = new FileReader();
        reader.onload = e => onSuccess(e.target.result);
        reader.readAsDataURL(file);
    }

    handleImageUpdate(imageFile, (newImage) => {
        let finalImage = newImage;
        if (!finalImage) {
            let existing = null;
            if (oldCategoryKey && booksObj[oldCategoryKey]) {
                existing = booksObj[oldCategoryKey].find(b => b.id === id);
            }
            finalImage = existing ? existing.image : '';
        }
        applyUpdate(id, title, author, cat, year, copies, descri, finalImage, booksObj, oldCategoryKey);
    });
});

function applyUpdate(id, title, author, cat, year, copies, descri, image, booksObj, oldCategoryKey) {
    var newCategoryKey = cat || 'selfHelp';

    if (oldCategoryKey && booksObj[oldCategoryKey]) {
        var oldArr = booksObj[oldCategoryKey];
        var j = 0;
        while (j < oldArr.length) {
            if (oldArr[j].id === id) {
                oldArr.splice(j, 1);
                break;
            }
            j++;
        }
    }

    if (!booksObj[newCategoryKey]) booksObj[newCategoryKey] = [];
    var updatedBook = {
        id: id,
        title: title,
        author: author,
        cat: cat,
        year: year,
        copies: copies,
        description: descri,
        image: image
    };
    booksObj[newCategoryKey].unshift(updatedBook);

    saveBooksObj(booksObj);
    document.getElementById('success_msg').textContent = "Book updated successfully!";

    if (image) {
        document.getElementById('current_image_preview').src = image;
        document.getElementById('current_image_wrapper').style.display = 'block';
    }
    document.getElementById('new_image_preview_wrapper').style.display = 'none';
    document.getElementById('edit_book_image').value = "";

    document.getElementById('edit_form').setAttribute('data-old-category', newCategoryKey);
}


window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var bookIdToEdit = urlParams.get('id');
    if (bookIdToEdit) {
        document.getElementById('search_query').value = bookIdToEdit;
        var form = document.getElementById('search_form');
        var event = new Event('submit', {
            'bubbles': true,
            'cancelable': true
        });
        form.dispatchEvent(event);
    }
});
