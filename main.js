//  Signup  -------------------------
let suUsername = document.getElementById('su-username');

if (suUsername) {
    let form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let username = document.getElementById('su-username').value.trim();
        let email = document.getElementById('su-email').value.trim();
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

        // Check if user already exists
        if (localStorage.getItem(username)) {
            alert('Error: This username is already taken. Please choose another one.');
            return;
        }

        let roleInput = document.querySelector('input[name="is_admin"]:checked');
        let role = roleInput ? roleInput.value : '0';

        let user = { username, email, password, role };
        localStorage.setItem(username, JSON.stringify(user));
        localStorage.setItem('currentUser', username);

        alert('Account created successfully! Welcome to Kotoby.');

        if (role == '1') {
            window.location.href = 'admin_book_list.html';
        } else {
            window.location.href = 'user_book_list.html';
        }
    });
}

// Login-------------------------
let loginUsername = document.getElementById('login-username');

if (loginUsername) {
    let form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let username = document.getElementById('login-username').value.trim();
        let password = document.getElementById('login-password').value;

        if (username == '' || password == '') {
            alert('Please fill in all fields!');
            return;
        }

        let storedUser = localStorage.getItem(username);

        if (storedUser == null) {
            alert('Account not found! Please check your username or Sign Up first.');
            return;
        }

        let userData = JSON.parse(storedUser);

        if (userData.password !== password) {
            alert('Error: Wrong password. Please try again.');
            return;
        }

        // Role Validation: Check if selected role matches actual role
        let selectedRole = document.querySelector('input[name="is_admin"]:checked').value;
        if (userData.role !== selectedRole) {
            alert('Account not found! Please check your username or Sign Up first.');
            return;
        }

        localStorage.setItem('currentUser', username);

        if (userData.role == '1') {
            window.location.href = 'admin_book_list.html';
        } else {
            window.location.href = 'user_book_list.html';
        }
    });
}

//user book list

//menu toggle 
function toggleMenu() {

    let sidebar = document.getElementById("sidebar");
    let icon = document.getElementById("menuIcon");

    sidebar.classList.toggle("open");



    if (sidebar.classList.contains("open")) {
        icon.textContent = "✕";
    } else {
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
//books data------------------------
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
            image: "assets/self_help/when_the_body_says_no.jpg",
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
        },
        {
            image: "assets/self_help/فن_الكلام.jpg",
            title: "فن الكلام",
            author: "إيهاب فكري",
            id: "S009",
            cat: "Self Help",
            year: "2018",
            copies: "7",
            description: "دليل عملي لتحسين مهارات التواصل والتحدث بثقة."
        },

        {
            image: "assets/self_help/محاط_مرضي_نفسيين.jpg",
            title: "محاط بالمرضى النفسيين",
            author: "توماس إريكسون",
            id: "S010",
            cat: "Self Help",
            year: "2019",
            copies: "6",
            description: "يساعدك على فهم الشخصيات الصعبة والتعامل معها بذكاء."
        },

        {
            image: "assets/self_help/سيكولوجيا_الانسان_المقهور.jpg",
            title: "سيكولوجية الإنسان المقهور",
            author: "مصطفى حجازي",
            id: "S011",
            cat: "Self Help",
            year: "2005",
            copies: "5",
            description: "تحليل عميق للحالة النفسية في المجتمعات المضغوطة."
        },

        {
            image: "assets/self_help/when_the_body_says_no.jpg",
            title: "عندما يقول الجسد لا",
            author: "غابور ماتيه",
            id: "S012",
            cat: "Self Help",
            year: "2003",
            copies: "6",
            description: "يربط بين الضغوط النفسية وتأثيرها على الصحة الجسدية."
        },

        {
            image: "assets/self_help/المخ_ذكر_أم_أنثى.jpg",
            title: "المخ ذكر أم أنثى؟",
            author: "د. عمرو شريف",
            id: "S013",
            cat: "Self Help",
            year: "2016",
            copies: "4",
            description: "يستعرض الفروق بين عقول الرجال والنساء بطريقة علمية مبسطة."
        },

        {
            image: "assets/self_help/فهم_الامراض_النفسية.jpg",
            title: "فهم الأمراض النفسية",
            author: "دين برنيت",
            id: "S014",
            cat: "Self Help",
            year: "2015",
            copies: "5",
            description: "شرح مبسط للاضطرابات النفسية وكيفية التعامل معها."
        },

        {
            image: "assets/self_help/مفتقد_الحياة.jpg",
            title: "مفتقد للحياة",
            author: "د. محمد إبراهيم",
            id: "S015",
            cat: "Self Help",
            year: "2020",
            copies: "6",
            description: "كتاب يناقش الشعور بالفراغ وكيفية استعادة الشغف بالحياة."
        },

        {
            image: "assets/self_help/الصحه_النفسيه.jpg",
            title: "الصحة النفسية",
            author: "د. أحمد خيري حافظ",
            id: "S016",
            cat: "Self Help",
            year: "2017",
            copies: "5",
            description: "دليل للحفاظ على التوازن النفسي وتحسين جودة الحياة."
        },

        {
            image: "assets/self_help/اكتب حتى لا اصاب بالجنون.jpg",
            title: "اكتب حتى لا أصاب بالجنون",
            author: "مريم التميمي",
            id: "S017",
            cat: "Self Help",
            year: "2021",
            copies: "6",
            description: "رحلة مع الكتابة كوسيلة للتعبير والتفريغ النفسي."
        },

        {
            image: "assets/self_help/مستعمل.jpg",
            title: "مستعمل",
            author: "محمد عصام",
            id: "S018",
            cat: "Self Help",
            year: "2022",
            copies: "4",
            description: "نظرة مختلفة للحياة والعلاقات من خلال تجارب واقعية."
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
        },
        {
            image: "assets/Fiction/photo_2_2026-04-11_17-32-35.jpg",
            title: "أرض زيكولا 2: أماريتا",
            author: "عمرو عبد الحميد",
            id: "F012",
            cat: "Fiction",
            year: "2016",
            copies: "8",
            description: "الجزء الثاني من أرض زيكولا، حيث تستكمل الرحلة في عالم أماريتا المليء بالغموض والتحديات."
        },

        {
            image: "assets/Fiction/photo_4_2026-04-11_17-32-35.jpg",
            title: "يوتوبيا",
            author: "أحمد خالد توفيق",
            id: "F013",
            cat: "Fiction",
            year: "2008",
            copies: "10",
            description: "رواية ديستوبية تكشف الفجوة بين الطبقات الاجتماعية في مجتمع قاسٍ ومظلم."
        },

        {
            image: "assets/Fiction/photo_3_2026-04-11_17-32-35.jpg",
            title: "صديقي السيكوباتي",
            author: "ميرنا المهدي",
            id: "F014",
            cat: "Fiction",
            year: "2022",
            copies: "6",
            description: "قصة نفسية مشوقة تكشف خبايا شخصية غامضة وعلاقات معقدة."
        },

        {
            image: "assets/Fiction/photo_1_2026-04-11_17-32-35.jpg",
            title: "وجع البنفسج",
            author: "أسامة المسلم",
            id: "F015",
            cat: "Fiction",
            year: "2021",
            copies: "7",
            description: "رواية مليئة بالغموض والمشاعر العميقة في عالم من الأسرار والتشويق."
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
        },
        {
            image: "assets/religious/wa_alzen_ma3ah.jpg",
            title: "والذين معه",
            author: "أدهم شرقاوي",
            id: "R008",
            cat: "Religious",
            year: "2020",
            copies: "6",
            description: "قصص ومواقف من حياة الصحابة تسلط الضوء على القيم الإيمانية والإنسانية."
        },

        {
            image: "assets/religious/na7n_nakos_3alek.jpg",
            title: "نحن نقص عليك",
            author: "أدهم شرقاوي",
            id: "R009",
            cat: "Religious",
            year: "2019",
            copies: "7",
            description: "عرض قصصي جميل لعدد من قصص الأنبياء بأسلوب مبسط ومؤثر."
        }
    ],
    science: [
        {
            image: "assets/Science/clean-code.jpg",
            title: "Clean Code",
            author: "Robert C. Martin",
            id: "SC001",    
            cat: "Programming",
            year: "2008",
            copies: "10",
            description: "A handbook of agile software craftsmanship and writing clean, maintainable code."
        },

        {
            image: "assets/Science/ds-and-algo.webp",
            title: "Data Structures & Algorithm Analysis",
            author: "Mark Allen Weiss",
            id: "SC002",
            cat: "Programming",
            year: "2014",
            copies: "8",
            description: "Comprehensive guide to data structures and algorithm efficiency."
        },

        {
            image: "assets/Science/network book1.jpeg",
            title: "Computer Networking",
            author: "Jason Callaway",
            id: "SC003",
            cat: "Computer Science",
            year: "2013",
            copies: "6",
            description: "Introduction to networking concepts, protocols, and infrastructure."
        },

        {
            image: "assets/Science/OIP (1).webp",
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            id: "SC004",
            cat: "Computer Science",
            year: "2009",
            copies: "9",
            description: "One of the most important books in algorithms and problem solving."
        },

        {
            image: "assets/Science/java.jpg",
            title: "Java Programming",
            author: "Joyce Farrell",
            id: "SC005",
            cat: "Programming",
            year: "2018",
            copies: "7",
            description: "Beginner-friendly guide to learning Java programming."
        },

        {
            image: "assets/Science/python.jpg",
            title: "Python Programming",
            author: "Eric Matthes",
            id: "SC006",
            cat: "Programming",
            year: "2019",
            copies: "11",
            description: "Hands-on introduction to Python for beginners."
        },

        {
            image: "assets/Science/flutter.jpg",
            title: "Google Flutter Guide",
            author: "Prajyot Mainkar",
            id: "SC007",
            cat: "Programming",
            year: "2020",
            copies: "5",
            description: "Guide to building cross-platform mobile apps using Flutter."
        },

        {
            image: "assets/Science/ai engineering.jpg",
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

let storedBooks = localStorage.getItem('libraryBooksObj');
if (storedBooks) {
    books = JSON.parse(storedBooks);
} else {
    localStorage.setItem('libraryBooksObj', JSON.stringify(books));
}

function showBooks(category) {
    let container = document.getElementById("container");
    let sidebar = document.getElementById("sidebar");
    let icon = document.getElementById("menuIcon");

    container.innerHTML = "";

    localStorage.setItem('currentCategory', category);

    if (books[category]) {
        books[category].forEach(book => createCard(book));
    }


    sidebar.classList.remove("open");
    icon.textContent = "☰";
    icon.style.display = "block";
}
if (window.location.href.includes("user_book_list.html") && document.getElementById("container")) {
    // Role Validation for User Page
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("Access Denied: Please log in first.");
        window.location.href = "login.html";
    } else {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        if (!userData || userData.role !== '0') {
            alert("Access Denied: This page is for regular users only.");
            window.location.href = "login.html";
        }
    }

    window.addEventListener("DOMContentLoaded", function () {

        let savedCategory = localStorage.getItem('currentCategory') || 'selfHelp';
        showBooks(savedCategory);
    });
}
// Search functionality


window.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(window.location.search);
    let searchTitle = params.get("title");
    let searchAuthor = params.get("author");
    let searchCategory = params.get("category");
    let searchYear = params.get("year");

    console.log("Searching for:", { searchTitle, searchAuthor, searchCategory, searchYear });

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
                    card.scrollIntoView({ behavior: "smooth", block: "center" });
                    card.classList.add("highlight");
                    break;
                }
            }
        }, 300);
    }
}

function highlightBook(title) {
    let books = document.querySelectorAll(".card");

    books.forEach(book => {
        let bookTitle = book.getAttribute("data-title");

        if (bookTitle.includes(title.toLowerCase())) {

            book.scrollIntoView({ behavior: "smooth", block: "center" });
            book.classList.add("highlight");
        }
    });
}
