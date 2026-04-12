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

  card.setAttribute("data-title", book.title.toLowerCase());

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
description: "Tiny changes, remarkable results. A guide to building good habits."
},

{
image: "assets/self_help/the_power_of_now.jpg",
title: "The Power of Now",
author: "Eckhart Tolle",
id: "S003",
cat: "Self Help",
year: "1997",
copies: "6",
description: "A guide to spiritual enlightenment and living in the present."
},

{
image: "assets/self_help/make_your_bed.jpg",
title: "Make Your Bed",
author: "William H. McRaven",
id: "S004",
cat: "Self Help",
year: "2017",
copies: "7",
description: "Small habits that can change your life and maybe the world."
},

{
image: "assets/self_help/deep_work.jpg",
title: "Deep Work",
author: "Cal Newport",
id: "S005",
cat: "Self Help",
year: "2016",
copies: "9",
description: "Rules for focused success in a distracted world."
},

{
image: "assets/self_help/rich_dad_poor_dad.jpg",
title: "Rich Dad Poor Dad",
author: "Robert Kiyosaki",
id: "S006",
cat: "Self Help",
year: "1997",
copies: "12",
description: "Lessons on money, investing, and financial independence."
},

{
image: "assets/self_help/when_the _body_says_no.jpg",
title: "When The Body Says No",
author: "Gabor Maté",
id: "S007",
cat: "Self Help",
year: "2003",
copies: "5",
description: "Explores the connection between stress and illness."
},

{
image: "assets/self_help/how_to_heal_your_inner_child.jpg",
title: "How To Heal Your Inner Child",
author: "Simon Chapple",
id: "S008",
cat: "Self Help",
year: "2021",
copies: "6",
description: "A guide to emotional healing and self-discovery."
}
],

fiction: [
{
image: "assets/Fiction/3enab-el-tha3lab.jpg",
title: "قضية عنب الثعلب",
author: "ميرنا المهدي",
id: "F001",
cat: "Fiction",
year: "2021",
copies: "6",
description: "قضية غامضة مليئة بالتشويق والأحداث غير المتوقعة."
},

{
image: "assets/Fiction/abadol.jpg",
title: "أبادول",
author: "حنان لاشين",
id: "F002",
cat: "Fiction",
year: "2018",
copies: "8",
description: "رحلة خيالية في عالم مليء بالصراعات والقيم الإنسانية."
},

{
image: "assets/Fiction/amwag_akma.jpg",
title: "أمواج أكما",
author: "عمرو عبد الحميد",
id: "F003",
cat: "Fiction",
year: "2016",
copies: "7",
description: "قصة مشوقة في عالم خيالي مليء بالغموض."
},

{
image: "assets/Fiction/ekadoly.jpg",
title: "إيكادولي",
author: "حنان لاشين",
id: "F004",
cat: "Fiction",
year: "2019",
copies: "6",
description: "رواية فانتازيا عن عالم مختلف وقوانين غير مألوفة."
},

{
image: "assets/Fiction/fe-mmr-el-fe2ran.jpg",
title: "في ممر الفئران",
author: "أحمد خالد توفيق",
id: "F005",
cat: "Fiction",
year: "2016",
copies: "10",
description: "رواية فلسفية سوداوية عن الحرية والسيطرة."
},

{
image: "assets/Fiction/garten_rules.jpg",
title: "قواعد جارتين",
author: "عمرو عبد الحميد",
id: "F006",
cat: "Fiction",
year: "2018",
copies: "9",
description: "عالم خيالي تحكمه قوانين صارمة وصراعات قوية."
},

{
image: "assets/Fiction/hebta.jpg",
title: "هيبتا",
author: "محمد صادق",
id: "F007",
cat: "Fiction",
year: "2014",
copies: "11",
description: "تحليل لمراحل الحب السبعة بأسلوب درامي مؤثر."
},

{
image: "assets/Fiction/khof.jpg",
title: "خوف",
author: "أسامة المسلم",
id: "F008",
cat: "Fiction",
year: "2017",
copies: "7",
description: "رواية رعب نفسية مليئة بالغموض والإثارة."
},

{
image: "assets/Fiction/loz-mr.jpg",
title: "قضية لوز مر",
author: "ميرنا المهدي",
id: "F009",
cat: "Fiction",
year: "2020",
copies: "5",
description: "قضية جديدة مليئة بالألغاز والتشويق."
},

{
image: "assets/Fiction/makhaleb.jpg",
title: "قضية مخالب القط",
author: "ميرنا المهدي",
id: "F010",
cat: "Fiction",
year: "2022",
copies: "6",
description: "جريمة غامضة تحتاج إلى تحليل دقيق لكشف الحقيقة."
},

{
image: "assets/Fiction/minto.jpg",
title: "مِنتو",
author: "عمرو عبد الحميد",
id: "F011",
cat: "Fiction",
year: "2020",
copies: "6",
description: "رواية خيالية في عالم مليء بالأسرار."
}
],
religious: [
{
image: "assets/religious/buit_menwarah.jpg",
title: "بيوت منورة",
author: "هالة سمير",
id: "R001",
cat: "Religious",
year: "2020",
copies: "7",
description: "كتاب يتناول قصصًا واقعية ملهمة عن البيوت المليئة بالإيمان."
},

{
image: "assets/religious/ela_Allah.jpg",
title: "إلى الله",
author: "أمير منير",
id: "R002",
cat: "Religious",
year: "2019",
copies: "8",
description: "رحلة روحية للتقرب إلى الله بأسلوب بسيط ومؤثر."
},

{
image: "assets/religious/fatetni_salah.jpg",
title: "فاتتني صلاة",
author: "إسلام جمال",
id: "R003",
cat: "Religious",
year: "2017",
copies: "10",
description: "كتاب يوضح أهمية الصلاة وكيفية الالتزام بها."
},

{
image: "assets/religious/konie_sahabia.png",
title: "كوني صحابية",
author: "حنان لاشين",
id: "R004",
cat: "Religious",
year: "2018",
copies: "6",
description: "دعوة للفتيات للاقتداء بالصحابيات في الأخلاق والسلوك."
},

{
image: "assets/religious/Manhagiah_Alsaier_ela_Allah.webp",
title: "منهجية السير إلى الله",
author: "د. علي أبو الحسن",
id: "R005",
cat: "Religious",
year: "2021",
copies: "5",
description: "دليل عملي للسير في طريق الإيمان والتقرب إلى الله."
},

{
image: "assets/religious/rsaael_men_AlQuran.jpg",
title: "رسائل من القرآن",
author: "أدهم شرقاوي",
id: "R006",
cat: "Religious",
year: "2016",
copies: "9",
description: "تأملات ورسائل مستوحاة من آيات القرآن الكريم."
},

{
image: "assets/religious/zad.webp",
title: "زاد",
author: "إسلام جمال",
id: "R007",
cat: "Religious",
year: "2019",
copies: "7",
description: "زاد إيماني يساعدك على الثبات في طريق الطاعة."
}
],
science: [
{
image: "assets/Programming/clean-code.jpg",
title: "Clean Code",
author: "Robert C. Martin",
id: "SC001",
cat: "Programming",
year: "2008",
copies: "10",
description: "A handbook of agile software craftsmanship and writing clean, maintainable code."
},

{
image: "assets/Programming/ds-and-algo.webp",
title: "Data Structures & Algorithm Analysis",
author: "Mark Allen Weiss",
id: "SC002",
cat: "Programming",
year: "2014",
copies: "8",
description: "Comprehensive guide to data structures and algorithm efficiency."
},

{
image: "assets/cs_and_tech/network book1.jpeg",
title: "Computer Networking",
author: "Jason Callaway",
id: "SC003",
cat: "Computer Science",
year: "2013",
copies: "6",
description: "Introduction to networking concepts, protocols, and infrastructure."
},

{
image: "assets/cs_and_tech/OIP (1).webp",
title: "Introduction to Algorithms",
author: "Thomas H. Cormen",
id: "SC004",
cat: "Computer Science",
year: "2009",
copies: "9",
description: "One of the most important books in algorithms and problem solving."
},

{
image: "assets/cs_and_tech/java.jpg",
title: "Java Programming",
author: "Joyce Farrell",
id: "SC005",
cat: "Programming",
year: "2018",
copies: "7",
description: "Beginner-friendly guide to learning Java programming."
},

{
image: "assets/cs_and_tech/python.jpg",
title: "Python Programming",
author: "Eric Matthes",
id: "SC006",
cat: "Programming",
year: "2019",
copies: "11",
description: "Hands-on introduction to Python for beginners."
},

{
image: "assets/cs_and_tech/flutter.jpg",
title: "Google Flutter Guide",
author: "Prajyot Mainkar",
id: "SC007",
cat: "Programming",
year: "2020",
copies: "5",
description: "Guide to building cross-platform mobile apps using Flutter."
},

{
image: "assets/cs_and_tech/ai engineering.jpg",
title: "AI Engineering",
author: "Chip Huyen",
id: "SC008",
cat: "Computer Science",
year: "2023",
copies: "6",
description: "Practical guide to building and deploying AI systems."
},

{
image: "assets/cs_and_tech/mysql.jpg",
title: "Pro MySQL NDB Cluster",
author: "Jesper Wisborg Krogh",
id: "SC009",
cat: "Computer Science",
year: "2017",
copies: "4",
description: "Advanced guide to MySQL clustering and database systems."
}
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



window.addEventListener("DOMContentLoaded", function() {
  let params = new URLSearchParams(window.location.search);
  let searchTitle = params.get("title");
  let searchAuthor = params.get("author");
  let searchCategory = params.get("category");
  let searchYear = params.get("year");

  console.log("Searching for:", {searchTitle, searchAuthor, searchCategory, searchYear});

  if (searchTitle || searchAuthor || searchCategory || searchYear) {
      filterAndShowBooks(searchTitle, searchAuthor, searchCategory, searchYear);
  }
});

function filterAndShowBooks(title, author, category, year) {
  let allBooks = [];
  
  for (let cat in books) {
      allBooks = allBooks.concat(books[cat]);
  }
  

  let filteredBooks = allBooks.filter(book => {
      let match = true;
      
      if (title && !book.title.toLowerCase().includes(title.toLowerCase())) {
          match = false;
      }
      
      if (author && !book.author.toLowerCase().includes(author.toLowerCase())) {
          match = false;
      }
      
      if (category && book.cat !== category && book.category !== category) {
          match = false;
      }
      
      if (year && book.year != year) {
          match = false;
      }
      
      return match;
  });
  

  let container = document.getElementById("container");
  container.innerHTML = "";
  
  if (filteredBooks.length === 0) {
      container.innerHTML = `<div style="color:white; text-align:center; padding:50px;">
          😔 No books found matching your search criteria.
      </div>`;
      return;
  }
  
  filteredBooks.forEach(book => createCard(book));
  
  if (title && filteredBooks.length > 0) {
      setTimeout(() => {
          let cards = document.querySelectorAll(".card");
          for (let card of cards) {
              let bookTitle = card.querySelector(".booktitle")?.innerText;
              if (bookTitle && bookTitle.toLowerCase().includes(title.toLowerCase())) {
                  card.scrollIntoView({behavior: "smooth", block: "center"});
                  card.classList.add("highlight");
                  break;
              }
          }
      }, 300);
  }
}

function highlightBook(title){
  let books = document.querySelectorAll(".card");

  books.forEach(book => {
      let bookTitle = book.getAttribute("data-title");

      if(bookTitle.includes(title.toLowerCase())){
          
          book.scrollIntoView({behavior: "smooth", block: "center"});
          book.classList.add("highlight");
      }
  });
}