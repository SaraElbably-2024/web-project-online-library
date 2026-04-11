
var books = [
    { id: "101", name: "Introduction to AI", author: "Alan Turing", category: "Technology", description: "Basics of Artificial Intelligence" },
    { id: "102", name: "Data Structures", author: "John Doe", category: "Science", description: "Learn trees and graphs" }
];


function searchBook() {
    var q = document.getElementById('search_query').value;
    var queryLower = q.toLowerCase(); 
    
    document.getElementById('search_query_err').innerHTML = "";

    if (q === "") {
        document.getElementById('search_query_err').innerHTML = "* Please enter a Book ID or name.";
        return false;
    }

    var foundBook = null;

    
    for (var i = 0; i < books.length; i++) {
        var bookIdLower = books[i].id.toLowerCase();
        var bookNameLower = books[i].name.toLowerCase();


        if (bookIdLower === queryLower || bookNameLower.indexOf(queryLower) !== -1) {
            foundBook = books[i];
            break;
        }
    }

    if (foundBook === null) {
        document.getElementById('search_query_err').innerHTML = "* No book found.";
    } else {
    
        document.getElementById('edit_book_id').value = foundBook.id;
        document.getElementById('edit_book_name').value = foundBook.name;
        document.getElementById('edit_author_name').value = foundBook.author;
        document.getElementById('edit_category').value = foundBook.category;
        document.getElementById('edit_descri').value = foundBook.description;
    }

    return false; 
}


function updateBook() {
    var id = document.getElementById('edit_book_id').value;
    var name = document.getElementById('edit_book_name').value;
    var author = document.getElementById('edit_author_name').value;
    var cat = document.getElementById('edit_category').value;
    var descri = document.getElementById('edit_descri').value;

    document.getElementById('edit_book_name_err').innerHTML = "";
    document.getElementById('edit_author_name_err').innerHTML = "";
    document.getElementById('success_msg').innerHTML = "";

    var isValid = true;

    if (id === "") {
        alert("Search for a book first.");
        return false;
    }

    if (name === "") {
        document.getElementById('edit_book_name_err').innerHTML = "* Book name is required.";
        isValid = false;
    } else {

        for (var i = 0; i < books.length; i++) {
            if (books[i].name.toLowerCase() === name.toLowerCase() && books[i].id !== id) {
                document.getElementById('edit_book_name_err').innerHTML = "* This name already exists.";
                isValid = false;
                break;
            }
        }
    }

    if (author === "") {
        document.getElementById('edit_author_name_err').innerHTML = "* Author is required.";
        isValid = false;
    }

    
    if (isValid === true) {

        for (var j = 0; j < books.length; j++) {
            if (books[j].id === id) {
                books[j].name = name;
                books[j].author = author;
                books[j].category = cat;
                books[j].description = descri;
                break;
            }
        }

        document.getElementById('success_msg').innerHTML = "Book updated successfully!";
        document.getElementById('success_msg').style.color = "green";
    }

    return false; 
}