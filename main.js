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

//user book list

//menu toggle 
function toggleMenu(){

let sidebar = document.getElementById("sidebar");
let icon = document.getElementById("menuIcon");

sidebar.classList.toggle("open");



if(sidebar.classList.contains("open")){
icon.textContent = "✕";
}else{
icon.textContent = "☰";
}
}
//----------------------

function createCard(book) {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img class="bookimg" src="${book.image}" alt="">
        <p class="booktitle">${book.title}</p>
        <button class="detailsbtn">
            View Details
        </button>
    `;

    card.querySelector(".detailsbtn").addEventListener("click", function () {
        viewDetails(book);
    });

    document.getElementById("container").appendChild(card);
}
function viewDetails(book) {
    const bookToSave = {
        ...book,
        image: book.image
    };

    localStorage.setItem('selectedBook', JSON.stringify(bookToSave));
    window.location.href = "Details_books.html";
}
 
let books = {

selfHelp:[
{
image:"assets/self_help/the-miracle_morning.jpg",
title:"Miracle Morning"
},

{
image: "assets/self_help/atomic_habits.png",
        title: "Atomic Habits",
        author: "James Clear",
        id: "S001",
        cat: "Self Help",
        year: "2018",
        copies: "10",
        description: "Tiny changes, remarkable results. A guide to building good habits."
},

{
image:"assets/self_help/the_power_of_now.jpg",
title:"The Power of Now"
},

{
image:"assets/self_help/make_your_bed.jpg",
title:"Make Your Bed"
},

{
image:"assets/self_help/deep_work.jpg",
title:"Deep Work"
},

{
image:"assets/self_help/rich_dad_poor_dad.jpg",
title:"Rich Dad Poor Dad"
},


{
image:"assets/self_help/when_the _body_says_no.jpg",  
title:"When The Body Says No"
},

{
image:"assets/self_help/how_to_heal_your_inner_child.jpg",
title:"How To Heal Your Inner Child"
}
],

fiction:[
    {
image:"assets/fiction/ekadoly.jpg",
title:"EKADOlY"
},
    {
image:"assets/fiction/garten rules.jpg",
title:"Garten Rules"
},
    {
image:"assets/Fiction/makhaleb.jpg",
title:"Makhaleb"
},

    {
image:"assets/Fiction/minto.jpg",
title:"Minto"
},
    {
image:"assets/Fiction/loz-mr.jpg",
title:"Loz-mor"
},

    {
image:"assets/Fiction/khof.jpg",
title:"Khof"
},

    {
image:"assets/Fiction/hebta.jpg",
title:"Hebta"
}, 
 
    {
image:"assets/Fiction/3enab-el-tha3lab.jpg",
title:"Enab Elthaalab"
},
    {
image:"assets/Fiction/amwag akma.jpg",
title:"Amwag Akma"
},

  {
image:"assets/Fiction/fe-mmr-el-fe2ran.jpg",
title:"Amwag Akma"
},


],
religious:[
    {
        image:"assets/religious/buit_menwarah.jpg",
        title:"بيوت منورة"
    },
     {
       image:"assets/religious/ela_Allah.jpg",
        title:"إلى الله"
    },
     {
        image:"assets/religious/fatetni_salah.jpg",
        title:"فاتتني الصلاة"
    },
     {
        image:"assets/religious/konie_sahabia.png",
        title:"كوني صحابية"
    },
     {
        image:"assets/religious/Manhagiah_Alsaier_ela_Allah.webp",
        title:"منهجية السير إلى الله"
    },
     {
        image:"assets/religious/rsaael_men_AlQuran.jpg",
        title:""
    },
      {
        image:"assets/religious/zad.webp",
        title:"زاد"
    },
    
],
science:[
   
   {
    image:"assets/Programming/clean-code.jpg",
    title:"Clean Code"
   },
    {
    image:"assets/Programming/ds-and-algo.webp",
    title:"Data Structure & Algorithm Analysis"
   },

]

};

function showBooks(category){

let container = document.getElementById("container");

container.innerHTML = "";

books[category].forEach(book => createCard(book));

document.getElementById("sidebar").classList.remove("open");

document.getElementById("menuIcon").style.display = "block";
}

if (window.location.href.includes("user_book_list.html") && document.getElementById("container")) {
    window.addEventListener("DOMContentLoaded", function() {
        showBooks('selfHelp');
    });
}
