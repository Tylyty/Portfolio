/* mobileMenu src=https://www.w3schools.com/howto/howto_js_mobile_navbar.asp */
function mobileMenu() {
  const burgerLinks = document.getElementById("burgerLinks");
  if (burgerLinks.style.maxHeight === "0px") {
    burgerLinks.style.maxHeight = "fit-content";
  } else {
    burgerLinks.style.maxHeight = 0;
  }
}

/* slideSchow src= https://www.w3schools.com/w3css/w3css_slideshow.asp */
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 4000); // Change image every xy seconds
}

/* slideSchow-buttons src= https://www.w3schools.com/w3css/w3css_slideshow.asp */
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

/* lazy-load src= https://alvarotrigo.com/blog/css-animations-scroll/ */
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

/* API src= https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data-de */
/* content src= https://theboywholivedapi.herokuapp.com/documentation */
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("hpbooks");
const url = "https://legacy--api.herokuapp.com/api/v1/books";

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let hpbooks = data;
    return hpbooks.map(function (book) {
      let li = createNode("li");
      let img = createNode("img");
      let span = createNode("span");
      img.src = book.image_url;
      span.innerHTML = `${book.title}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

/* form */
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
