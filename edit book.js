class Book {
    constructor(id, name, author, category, description) {
        this.id          = id;
        this.name        = name;
        this.author      = author;
        this.category    = category;
        this.description = description;
    }
}




function loadBooks() {
    var stored = localStorage.getItem('libraryBooks');
    if (stored) {
        return JSON.parse(stored);
    }
    return [];
}

function saveBooks(books) {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}



document.getElementById('search_form').addEventListener('submit', function(e) {
    e.preventDefault();

    var q = document.getElementById('search_query').value.trim().toLowerCase();

    document.getElementById('search_query_err').textContent = "";
    document.getElementById('success_msg').textContent      = "";

    document.getElementById('edit_book_id').value     = "";
    document.getElementById('edit_book_name').value   = "";
    document.getElementById('edit_author_name').value = "";
    
    document.getElementById('edit_category').value    = "Technology";
    document.getElementById('edit_descri').value      = "";

    if (q === "") {
        document.getElementById('search_query_err').textContent = " Please enter a Book ID or name.";
        return;
    }

    var books     = loadBooks();
    var foundBook = null;

    for (var i = 0; i < books.length; i++) {
        if (books[i].id === q || books[i].name.toLowerCase().includes(q)) {
            
            foundBook = books[i];
            break;
        }
    }

    if (!foundBook) {
        document.getElementById('search_query_err').textContent = " No book found with  ID or name.";
        return;
    }
    

    document.getElementById('edit_book_id').value     = foundBook.id;
    document.getElementById('edit_book_name').value   = foundBook.name;
    document.getElementById('edit_author_name').value = foundBook.author;
    document.getElementById('edit_category').value    = foundBook.category;
    document.getElementById('edit_descri').value      = foundBook.description;
    
});

document.getElementById('edit_form').addEventListener('submit', function(e) {
    e.preventDefault();

    var id     = document.getElementById('edit_book_id').value.trim();
    var name   = document.getElementById('edit_book_name').value.trim();
    var author = document.getElementById('edit_author_name').value.trim();
    var cat    = document.getElementById('edit_category').value;
    var descri = document.getElementById('edit_descri').value.trim();

    document.getElementById('edit_book_name_err').textContent   = "";
    document.getElementById('edit_author_name_err').textContent = "";
    document.getElementById('success_msg').textContent          = "";

    if (id === "") {
        
        alert("Please search for a book first.");
        return;
    }

    var isValid = true;
    var books   = loadBooks();

    if (name === "") {
        document.getElementById('edit_book_name_err').textContent = " Book name is required.";
        isValid = false;
    } else {
        
        for (var i = 0; i < books.length; i++) {
            if (books[i].name.toLowerCase() === name.toLowerCase() && books[i].id !== id) {
                
                document.getElementById('edit_book_name_err').textContent = " This book name already exists.";
                isValid = false;
                break;
            }
        }
    }

if (author === "") {
    document.getElementById('edit_author_name_err').textContent = " Author is required.";
    isValid = false;
} else {
    var valid = true;
    for (var i = 0; i < author.length; i++) {
        
        var c = author[i];
        if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === ' ')) {
            
            valid = false;
            break;
        }
    }
    if (!valid) {
        document.getElementById('edit_author_name_err').textContent = " Author name must contain letters only.";
        isValid = false;
    }
}
    
    if (!isValid) {
        return;
    }

    
    for (var j = 0; j < books.length; j++) {
        if (books[j].id === id) {
            books[j].name        = name;
            books[j].author      = author;
            books[j].category    = cat;
            books[j].description = descri;
            break;
        }
    }

    saveBooks(books);
    document.getElementById('success_msg').textContent = "Book updated successfully!";
});
