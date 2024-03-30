import { showUserNameInNavbar, renderTopbarMenus,  getAllMenues ,submitNewsLetter } from "./funcs/sheared.js";

  import {  paginateItems ,getUrlParam , addParamToUrl } from "./funcs/utils.js";
  window.addParamToUrl=addParamToUrl;
  let paginatedCourses=[];
  let itemsPerPage=6;

const coursePage=getUrlParam('page');
  window.addEventListener('load',()=>{
    showUserNameInNavbar();
    renderTopbarMenus();
    getAllMenues();
    showCourses();

  })
  const showCourses = async () => {
    const courseContainer = document.querySelector("#course-countainer");
    const paginationWrapper=document.querySelector('.pagination-list');
    const res = await fetch("http://localhost:4000/v1/courses");
    const courses = await res.json()  
    .then((allCourse) => {
          paginatedCourses=  paginateItems([...allCourse],itemsPerPage,paginationWrapper,coursePage);
    
          paginatedCourses.map((course) =>
          courseContainer.insertAdjacentHTML(
            "beforeend",
  
            ` 
           <div class="col-4">
            <div class="course-box">
              <a href="/course-info.html?name=${course.shortName}">
                 <img src=http://localhost:4000/courses/covers/${course.cover } alt="Course img" class="course-box__img" />
              </a>
              <div class="course-box__main">
                <a class="course-box__title" href="">
                  ${course.name}
                </a>
                <div class="course-box__raiting-teacher">
                  <div class="course-box__teacher">
                    <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                    <a class="course-box__teacher-link">${course.creator}</a>
                  </div>
  
                  <div class="course-box__raiting">
                  ${Array(course.courseAverageScore)
                    .fill(0)
                    .map(
                      (star) =>
                        ' <img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">'
                    )
                    .join("")}
                  
                  ${Array(5 - course.courseAverageScore)
                    .fill(0)
                    .map(
                      (score) =>
                        ' <img src="./images/svgs/star.svg" alt="" class="course-box__star">'
                    )
                    .join("")}
                
                  </div>
  
                </div>
         
                <div class="course-bos__status">
                  <div class="course-box__users">
                    <i class="fas fa-users course-box__users-icon"></i>
                    <span class="course-box__text">${course.registers}</span>
                  </div>
                  ${
                    course.price !== 0
                      ? ` <div class="course-box__price">${course.price.toLocaleString()} $</div> `
                      : "Free"
                  }
                 
                </div>
              </div>
              <div class="course-box__footer">
                <a href ="/course-info.html?name=${course.shortName}" class="course-box__footer-link">View Info
         
                  <i class="fas fa-arrow-right course-box__footer-icon"></i>
                </a>
              </div>
            </div>
          </div>
         `
          )
        );
      });
  };
  const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter()
})
