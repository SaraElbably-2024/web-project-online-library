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


document.getElementById('add_form').addEventListener('submit', function(e) {
    e.preventDefault();

    
    var id          = document.getElementById('book_id').value.trim();
    var name        = document.getElementById('book_name').value.trim();
    var author      = document.getElementById('author').value.trim();
    var category    = document.getElementById('category').value;
    var description = document.getElementById('description').value.trim();

    

    document.getElementById('book_id_err').textContent   = "";
    document.getElementById('book_name_err').textContent = "";
    document.getElementById('author_err').textContent    = "";
    document.getElementById('category_err').textContent  = "";
    document.getElementById('success_msg').textContent   = "";

    

    var books   = loadBooks();
    var isValid = true;

    
    if (id === "") {
        document.getElementById('book_id_err').textContent = " Book ID is required.";
        isValid = false;
    } else if (isNaN(id)) {
        document.getElementById('book_id_err').textContent = " Book ID must be a number.";
        isValid = false;
        
    } else {
        var duplicate = false;
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                duplicate = true;
                break;
            }
        }
        if (duplicate) {
            document.getElementById('book_id_err').textContent = " ID already exists.";
            isValid = false;
        }
    }

    if (name === "") {
        document.getElementById('book_name_err').textContent = " Book name is required.";
        isValid = false;
    }

    

    if (author === "") {
        document.getElementById('author_err').textContent = " Author is required.";
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
            document.getElementById('author_err').textContent = " Author name must contain letters only.";
            isValid = false;
        }
    }
    

    if (category === "") {
        document.getElementById('category_err').textContent = " Please select a category.";
        isValid = false;
    }

    

    if (isValid) {
        var newBook = new Book(id, name, author, category, description);
        books.push(newBook);
        saveBooks(books);
        document.getElementById('success_msg').textContent = "Book added successfully!";
        document.getElementById('add_form').reset();
    }
});
