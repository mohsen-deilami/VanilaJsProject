import { showUserNameInNavbar,  renderTopbarMenus,  getAllMenues , getInfosIndex} from "./funcs/sheared.js";

const urlParams=new URLSearchParams(location.search);
const searchparam=urlParams.get('searchparam')
window.addEventListener('load',()=>{
  showUserNameInNavbar();
  renderTopbarMenus();
  getAllMenues();
   showSearchCourses();
   getInfosIndex();
})


const globalSearch=async(searchValue)=>{
const res= await  fetch(`http://localhost:4000/v1/search/${searchValue}`)
const result=await res.json();
return result
}


const showSearchCourses=()=>{
  const courseContainer = document.querySelector("#course-countainer");
  const articlesContainer=document.querySelector('#article-countainer');

  globalSearch(searchparam).then(data=>{
   console.log(data);
data.allResultCourses.length !== 0 ? 

(  data.allResultCourses.map(course=>(
      
  courseContainer.insertAdjacentHTML(
   "beforeend",

   ` 
  <div class="col-4">
   <div class="course-box">
     <a href="/course-info.html?name=${course.shortName}">
       <img src=./images/courses/${course.cover} alt=${course.shortName } class="course-box__img">
     </a>
     <div class="course-box__main">
       <a class="course-box__title" href="">
         ${course.name}
       </a>
       <div class="course-box__raiting-teacher">
         <div class="course-box__teacher">
           <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
           <a class="course-box__teacher-link">Mohsen Deilami</a>
         </div>

         <div class="course-box__raiting">
         <img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">
         <img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">
         <img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">
         <img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">
         <img src="./images/svgs/star.svg" alt="" class="course-box__star">
        
       
         </div>

       </div>

       <div class="course-bos__status">
         <div class="course-box__users">
           <i class="fas fa-users course-box__users-icon"></i>
           ${course.isComplete === 0 ? '<span class="course-box__text"> On performing </span>' 
           : 
          ' <span class="course-box__text">finished </span>' }
        
         </div>
         ${
           course.price !== 0
             ? ` <div class="course-box__price">${course.price.toLocaleString()} $</div> `
             : "Free"
         }
        
       </div>
     </div>
     <div class="course-box__footer">
       <a href="/course-info.html?name=${course.shortName}" class="course-box__footer-link">View Info

         <i class="fas fa-arrow-right course-box__footer-icon"></i>
       </a>
     </div>
   </div>
 </div>
`
 
)
))
):(
  courseContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="alert alert-danger">There is no course for this search</div>`
  )
)

  
data.allResultArticles.length !==0 ?
(
  data.allResultArticles.map(article=>(
    articlesContainer.insertAdjacentHTML(
      "beforeend",
  
      `
    <div class="col-4">
    <div class="article-box">
     <a href="">
       <img src=http://localhost:4000/courses/covers/${article.cover} alt="article" class="article-box__img">
     </a>
     <div class="article-box__main">
       <a class="article-box__title" href="#">
        ${article.title}
       </a>
       <p class="article-box__text">${article.description}
       </p>
       <div class="article-box__btn">
         <a href="#" class="articel__link">Read more...</a>
       </div>
     </div>
   </div>
   </div>
    `
    )
  ))
):(
  articlesContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="alert alert-danger">There is no Article for this search</div>`
  )
)
 
  })

}




