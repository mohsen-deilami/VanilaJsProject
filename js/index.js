import { showUserNameInNavbar,
  renderTopbarMenus,
  getAllAndShowCourses, 
  getpopularAndShowCourses,
  getPresellAndShowCourses,
  getAndShowArticles,
  getAllMenues,
  submitNewsLetter
} from "./funcs/sheared.js";
const topbarEmailElem=document.querySelector('#topbar-email');
const topbarPhoneElem=document.querySelector('#topbarPhone');
const landingTitle = document.querySelector(".landing__title");
const userCounter = document.querySelector("#user__count");
const courseCounter = document.querySelector("#course__count");
const productCountert = document.querySelector("#product__count");
const globalSearchInput=document.querySelector('.landing__searchbar-input');
const searchbarBtn=document.querySelector('.landing__searchbar-btn');

let email;
let phone;


window.addEventListener("load", () => {
  let landingText = " We do not produce training courses at any price !";
  let typeIndex = 0;
  getInfosIndex();
  typeWriter(landingText, typeIndex);
  showUserNameInNavbar();
  renderTopbarMenus();
  getAllAndShowCourses();
  getpopularAndShowCourses();
  getPresellAndShowCourses();
  getAndShowArticles();
  getAllMenues();
  
});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }

  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}

function makeCounter(max, elm) {
  let count = 0;
  let counter = setInterval(() => {
    elm.innerHTML = count;
    count++;
    if (count > max) {
      clearInterval(counter);
    }
  }, 1);
}

searchbarBtn.addEventListener('click',()=>{
  const seachValue=globalSearchInput.value.trim();
  location.href=`/search.html?searchparam=${seachValue}`;
}
)

function getInfosIndex(){
  fetch('http://localhost:4000/v1/infos/index')
  .then(res=>res.json())
  .then(infos=>{
    topbarEmailElem.innerHTML=infos.email;
     topbarPhoneElem.innerHTML=infos.phone;
   
     makeCounter(infos.usersCount, userCounter);
     makeCounter(infos.coursesCount, courseCounter);
     makeCounter(infos.totalTime, productCountert);
  })
}


const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter()
})