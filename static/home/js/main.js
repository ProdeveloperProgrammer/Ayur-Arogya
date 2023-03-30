//Swiper slider
var swiper = new Swiper(".bg-slider-thumbs", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 0,
});
var swiper2 = new Swiper(".bg-slider", {
  loop: true,
  spaceBetween: 0,
  thumbs: {
    swiper: swiper,
  },
});

//Navigation bar effects on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Contact Form Amazing Animations
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// Validation email
function validationText() {
  var form = document.getElementById("form");
  var email = document.getElementById("email").value;
  var text = document.getElementById("text");
  var pattern1 = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (email.match(pattern1)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    text.style.display = "none";
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    text.innerHTML = "Your Email Address is Invalid";
    text.style.color = "#ff0000";
    text.style.display = "block";
  }
}



// ====== Header ======
let searchBtn = document.querySelector(".searchBtn");
let closeBtn = document.querySelector(".closeBtn");
let searchBox = document.querySelector(".searchBox");
let navigation = document.querySelector(".navigation");
let menuToggle = document.querySelector(".menuToggle");
let header = document.querySelector("header");
let searchInput = document.getElementsByName("search_content")[0];
let row_div = document.querySelector(".row");

searchBtn.onclick = function () {
  searchBox.classList.add("active");
  closeBtn.classList.add("active");
  searchBtn.classList.add("active");
  menuToggle.classList.add("hide");
  header.classList.add("hidden");
  header.classList.remove("open");
  if (searchInput.value.trim("") !== "" && searchBox.classList.contains("active") === true) {
    const data = { "search_content": searchInput.value.trim() };
    fetch("/search/", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then((data) => {
        row_div.innerHTML = '';
        closeBtn.click();
        document.querySelector("#explore").scrollIntoView();
        got_data = JSON.parse(data.model_filtered);
        for (var i = 0; i < data.search_count; i++) {
          row_div.innerHTML += `
          <div class="image">
            <img src="/fileupload/${got_data[i].fields.Photo}">
            <div class="details">
              <h2><span>${got_data[i].fields.Name.slice(0,5)}</span>${got_data[i].fields.Name.slice(5,).substring(0,11)}</h2>
              <p>${got_data[i].fields.Detail.substring(0,150)}</p>
              <div class="more">
                <a class="read-more"><i name="${got_data[i].fields.Detail}">Read <span>More<span></i></a>
                <div class="icon-links">
                  <a><i class="fa-solid fa-heart"></i></a>
                  <a><i class="fa-solid fa-eye" src="/fileupload/${got_data[i].fields.Photo}"></i></a>
                </div>
              </div>
            </div>
          </div>      
          `;

        }
        searchInput.value = ""
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  else {
  }
}
closeBtn.onclick = function () {
  searchBox.classList.remove("active");
  closeBtn.classList.remove("active");
  searchBtn.classList.remove("active");
  menuToggle.classList.remove("hide");
  header.classList.remove("hidden");
  header.classList.remove("open");
};
menuToggle.onclick = function () {
  header.classList.add("open");
  closeBtn.classList.add("active");
  searchBtn.classList.remove("active");
  menuToggle.classList.add("hide");
};
// ====== Popup Image ======
document.querySelectorAll(".image .more a i.fa-solid.fa-eye").forEach((image) => {
  image.onclick = () => {
    document.querySelector(".popup .imag").style.display = "block";
    document.querySelector(".popup .imag img").src = image.getAttribute("src");
  };
});
// ====== Popup Read More ======
document.querySelectorAll(".image .more a.read-more i").forEach((name) => {
  name.onclick = () => {
    document.querySelector(".popup .text").style.display = "block";
    document.querySelector(".popup .text p").innerHTML = `<h1 style="text-align: center;margin-top: 10vh; text-transform: capitalize;">${name.getAttribute("title")}</h1><br style="color:white;">
    <p style="text-align: center;">${name.getAttribute("name")}</p>`;
  };
});

document.querySelector(".popup").onclick = () => {
  document.querySelector(".popup .imag").style.display = "none";
  document.querySelector(".popup .text").style.display = "none";
};


// ====== HEART WORK ======
document
  .querySelectorAll(".image .more i.fa-solid.fa-heart")
  .forEach((button) => {
    var e = 0;
    button.onclick = () => {
      if (e % 2 == 0) {
        button.style.color = "#f00";
      } else {
        button.style.color = "#000";
      }
      e++;
    };
  });