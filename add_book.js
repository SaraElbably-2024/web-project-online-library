
var books = [];


document.getElementById('add_form').addEventListener('submit', function(e) {

    e.preventDefault();

    var id = document.getElementById('book_id').value;
    var name = document.getElementById('book_name').value;
    var author = document.getElementById('author').value;
    var category = document.getElementById('category').value;

    
    document.getElementById('book_id_err').innerHTML = "";
    document.getElementById('book_name_err').innerHTML = "";
    document.getElementById('author_err').innerHTML = "";
    document.getElementById('category_err').innerHTML = "";
    document.getElementById('success_msg').innerHTML = "";

    var isValid = true;

    if (id === "") {
        document.getElementById('book_id_err').innerHTML = " Book ID is required.";
        isValid = false;
    } else {
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                document.getElementById('book_id_err').innerHTML = " ID is  exists.";
                isValid = false;
                break;
            }
        }
    }

    if (name === "") {
        document.getElementById('book_name_err').innerHTML = "  Book name is required.";
        isValid = false;
    }

    if (author === "") {
        document.getElementById('author_err').innerHTML = " Author is required.";
        isValid = false;
    }

    if (category === "") {
        document.getElementById('category_err').innerHTML = " Please select a category.";
        isValid = false;
    }

    if (isValid === true) {
        var newBook = { id: id, name: name, author: author, category: category };
        books.push(newBook);
        
        document.getElementById('success_msg').innerHTML = "Book added successfully!";
        
        document.getElementById('add_form').reset(); 
    }
});
