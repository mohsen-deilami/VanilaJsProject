import {
  showUserNameInNavbar,
  renderTopbarMenus,
  getAllMenues,
  getAndShowCategoryCourses,
  coursesSorting,
  showCourses,
  submitNewsLetter,
  getInfosIndex

} from "./funcs/sheared.js";
import { searchInArray , paginateItems ,getUrlParam , addParamToUrl} from "./funcs/utils.js";
 
window.addParamToUrl=addParamToUrl;

let showType='row' ;
let courses=[];
let shownCourses=[];
let itemsPerPage=3;
let paginatedCourses=[]
const categoryPage=getUrlParam('page');

const coursesSearchBar=document.querySelector('.courses-top-bar__input');
const paginationWrapper=document.querySelector('.pagination-list');

window.addEventListener("load", () => {
  showUserNameInNavbar();
  renderTopbarMenus();
  getAllMenues();
  getAndShowCategoryCourses().then(responseCourses => {
  
    courses=[...responseCourses];
    shownCourses=[...responseCourses];
     paginatedCourses=  paginateItems([...shownCourses],itemsPerPage,paginationWrapper,categoryPage);
    showCourses(paginatedCourses,showType);
  });
});


/* نحوه نمایش بصورت ستونی یا ردیفی*/
const showTypeIcons = document.querySelectorAll("#showTypeIcon");
showTypeIcons.forEach((showTypeIcon) => {
  showTypeIcon.addEventListener("click", (event) => {
    showTypeIcons.forEach((icon) =>
      icon.classList.remove("courses-top-bar__icon--active")
    );
    event.target.classList.add("courses-top-bar__icon--active");

    if (String(event.target.classList).includes("row")) {
       showType='row'
      showCourses(paginatedCourses,showType);
  
    } else {
       showType='column'
      showCourses(paginatedCourses,showType);
     
    }
  });
});

/*  نمایش کورس ها بر اساس سکلکت های مختلف از طرف کاربر    */
const selectionTitleElement = document.querySelector(".courses-top-bar__selection-title");
const coursesFilteringSelections = document.querySelectorAll( ".courses-top-bar__selection-item");

let shownCourseFunc = coursesFilteringSelections.forEach(selectionItem =>
  selectionItem.addEventListener("click", (event) => {
    coursesFilteringSelections.forEach((selectionItemForDeActive) =>
      selectionItemForDeActive.classList.remove(
        "courses-top-bar__selection-item--active"
      )
    );

    event.target.classList.add("courses-top-bar__selection-item--active");

    selectionTitleElement.innerHTML = "";
    selectionTitleElement.insertAdjacentHTML(
      "beforeend",
      `
    <span class="courses-top-bar__selection-title" >
   ${event.target.innerHTML}
     <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
   </span>
    `
    );
   
   
      let sortType=event.target.dataset.key;
      shownCourses=[...courses];
      shownCourses = coursesSorting([...paginatedCourses], sortType);
      showCourses(shownCourses, showType)
  })
);

 
coursesSearchBar.addEventListener('input' , event=>{
 shownCourses= searchInArray([...courses] , 'name' , event.target.value)
  showCourses(shownCourses, showType)
})

const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter();
  getInfosIndex();
})


