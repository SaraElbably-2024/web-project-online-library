let books = {
    selfHelp: [
        {
            image: "assets/self_help/the-miracle_morning.jpg",
            title: "Miracle Morning",
            author: "Hal Elrod",
            id: "S002",
            cat: "Self Help",
            year: "2012",
            copies: "8",
            description: "A powerful morning routine to transform your life."
        },
        {
            image: "assets/self_help/atomic_habits.png",
            title: "Atomic Habits",
            author: "James Clear",
            id: "S001",
            cat: "Self Help",
            year: "2018",
            copies: "10",
            description: "Tiny changes, remarkable results."
        },
        {
            image: "assets/self_help/the_power_of_now.jpg",
            title: "The Power of Now",
            author: "Eckhart Tolle",
            id: "S003",
            cat: "Self Help",
            year: "1997",
            copies: "6",
            description: "A guide to living in the present."
        },
        {
            image: "assets/self_help/make_your_bed.jpg",
            title: "Make Your Bed",
            author: "William H. McRaven",
            id: "S004",
            cat: "Self Help",
            year: "2017",
            copies: "7",
            description: "Small habits that change your life."
        }
    ]
};

window.addEventListener("DOMContentLoaded", function () {

    function showBooks(category) {
        let container = document.getElementById("container");
        if (!container) return;

        container.innerHTML = "";

        if (!books[category]) return;

        books[category].forEach((book, index) => {
            createCard(book, category, index);
        });

        let sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.remove("open");
    }

    function createCard(book, category, index) {

        let container = document.getElementById("container");

        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3 class="booktitle">${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.year}</p>
        `;

        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete" ;
        delBtn.classList.add("deletebtn");

        delBtn.onclick = function () {
            deleteBook(category, index);
        };

        card.appendChild(delBtn);
        container.appendChild(card);
    }

    function deleteBook(category, index) {
        books[category].splice(index, 1);
        showBooks(category);
    }

    window.showBooks = showBooks;

    window.toggleMenu = function () {
        let sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.toggle("open");
    };

    showBooks("selfHelp");

});