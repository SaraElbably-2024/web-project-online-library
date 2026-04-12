document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("searchForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            let title = document.getElementById("title").value;
            let author = document.getElementById("author").value;
            let category = document.getElementById("category").value;
            let year = document.getElementById("year").value;

            let url = "user_book_list.html?title=" + encodeURIComponent(title);

            if (author) {
                url += "&author=" + encodeURIComponent(author);
            }

            if (category) {
                url += "&category=" + encodeURIComponent(category);
            }

            if (year) {
                url += "&year=" + encodeURIComponent(year);
            }

          
            window.location.href = url;
        });
    }
});