import { getMe } from "./auth.js";
import { isLogin , getUrlParam ,showSwal} from "./utils.js";

const renderTopbarMenus = async () => {
  const topBarMenus = document.querySelector(".top-bar__menu");
  const menus = await fetch("http://localhost:4000/v1/menus/topbar");
  const topBarList = await menus.json();

  topBarMenus.innerHTML = "";
  const shuffledArray = topBarList.sort(() => 0.5 - Math.random());
  [...shuffledArray].slice(0, 6).map(
    (menu) =>
      (topBarMenus.innerHTML += `
      <li class="top-bar__item">
                   <a href="/course-info.html?name=${menu.href}" class="top-bar__link">${menu.title}</a>
                 </li>`)
  );
  getInfosIndex();
};

const showUserNameInNavbar = () => {
  const navbarProfileBox = document.querySelector(".main-header__profile");
  const isUserLogin = isLogin();

  if (isUserLogin) {
    const userInfos = getMe().then((data) => {
      navbarProfileBox.setAttribute("href", "/my-account/Account/index.html");
      navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`;
    });
  } else {
    navbarProfileBox.setAttribute("href", "login.html");
    navbarProfileBox.innerHTML =
      '<span class="main-header__profile-text"> Register / Login</span> ';
  }
};

const getAllAndShowCourses = async () => {
  const courseContainer = document.querySelector("#course-countainer");
  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json()
 
 .then((allCourse) => {
      allCourse.slice(0, 6).map((course) =>
        courseContainer.insertAdjacentHTML(
          "beforeend",
          ` 
          <div class="col-4">
          <div class="course-box">
            <a href=course-info.html?name=${course.shortName}>
              <img src=http://localhost:4000/courses/covers/${course.cover } alt="Course img" class="course-box__img" />
            </a>
            <div class="course-box__main">
              <a href=course-info.html?name=${course.shortName} class="course-box__title">${course.name}</a>

              <div class="course-box__rating-teacher">
                <div class="course-box__teacher">
                  <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                  <a href="#" class="course-box__teacher-link">${
                    course.creator
                  }</a>
                </div>
                <div class="course-box__rating">
                ${Array(5 - course.courseAverageScore).fill(0).map((score) =>
                      '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                  )
                  .join("")}
                ${Array(course.courseAverageScore).fill(0).map((score) =>
                      '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                  ).join("")}
                </div>
              </div>

              <div class="course-bos__status">
                <div class="course-box__users">
                  <i class="fas fa-users course-box__users-icon"></i>
                  <span class="course-box__users-text">${course.registers }</span>
                </div>
                
                <div class="courses-box__price">
                  ${course.price === 0 ? "Free" :'' }

                    
                  ${  (course.price !== 0 && course.discount) ?
                     `
                      <span class="courses-box__price-discount">
                      ${(course.price - (course.price * course.discount / 100)).toLocaleString()} $
                      </span>
                      <span class="courses-box__price courses-box__undiscount">${course.price.toLocaleString()}$</span>
                    `
                    :
                    `
                     <span class="courses-box__price ">${course.price.toLocaleString()}$</span>
                   `
                  }
                </div>
                
              </div>
            </div>

            <div class="course-box__footer">
              <a href="#" class="course-box__footer-link">
                 View Info
                <i class="fas fa-arrow-left course-box__footer-icon"></i>
              </a>
            </div>

            ${
              course.discount && course.price !== 0 ? `
                <span class="courses-box__discount">${course.discount}%</span>
              ` : ``
            }
          </div>
        </div>
       `
        )
      );
    }); 
};

const getpopularAndShowCourses = async () => {
  const courseContainer = document.querySelector("#popular-course__container");
  const res = await fetch("http://localhost:4000/v1/courses/popular");
  const courses = await res.json()

    .then((allCourse) => {
      allCourse.map((course) =>
      
        courseContainer.insertAdjacentHTML(
          "beforeend",

          ` <div class="swiper-slide" >
      
         <div class="course-box">
       
           <a href="course-info.html?name=${course.shortName}">
             <img src=http://localhost:4000/courses/covers/${
               course.cover
             } alt=${course.shortName} class="course-box__img">
           </a>
           <div class="course-box__main">
             <a class="course-box__title" href="course-info.html?name=${course.shortName}">
               ${course.name}
             </a>
             <div class="course-box__raiting-teacher">
               <div class="course-box__teacher">
                 <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                 <a class="course-box__teacher-link">${course.creator}</a>
               </div>

               <div class="course-box__raiting">
               ${Array(course.courseAverageScore) .fill(0).map( (star) =>
                     ' <img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">'
                 ).join("")}
               
               ${Array(5 - course.courseAverageScore).fill(0).map((score) =>
                     ' <img src="./images/svgs/star.svg" alt="" class="course-box__star">'
                 ).join("")}
             
               </div>
             </div>
      
             <div class="course-bos__status">
               <div class="course-box__users">
                 <i class="fas fa-users course-box__users-icon"></i>
                 <span class="course-box__text">${course.registers}</span>
               </div>

                <div class="courses-box__price">
               
                ${course.price === 0 ? "Free" :'' }
 
                ${  (course.price !== 0 && course.discount) ?
                   `
                    <span class="courses-box__price-discount">
                    ${(course.price - (course.price * course.discount / 100)).toLocaleString()} $
                    </span>
                    <span class="courses-box__price courses-box__undiscount">${course.price.toLocaleString()}$</span>
                  `
                  :
                  `
                   <span class="courses-box__price ">${course.price.toLocaleString()}$</span>
                 `
                }
              </div>
             </div>
           </div>
           <div class="course-box__footer">
             <a class="course-box__footer-link">View Info
      
               <i class="fas fa-arrow-right course-box__footer-icon"></i>
             </a>
           </div>
           ${
            course.discount && course.price !== 0 ? `
              <span class="courses-box__discount">${course.discount}%</span>
            ` : ``
          }
          
         </div>
       </div>
      `
        )
      );
    });
};

const getPresellAndShowCourses = async () => {
  const courseContainer = document.querySelector("#presell-course__container");
  const res = await fetch("http://localhost:4000/v1/courses/presell");
  const courses = await res.json()

    .then((allCourse) => {
      allCourse.forEach((course) =>
      {
        courseContainer.insertAdjacentHTML(
          "beforeend",

          ` <div class="swiper-slide" >
       
          <div class="course-box">
          <div class="discount-box"></div>
            <a href="course-info.html?name=${course.shortName}">
              <img src=http://localhost:4000/courses/covers/${
                course.cover
              } alt=${course.shortName} class="course-box__img">
            </a>
            <div class="course-box__main">
              <a class="course-box__title" href="course-info.html?name=${course.shortName}">
                ${course.name}
              </a>
              <div class="course-box__raiting-teacher">
                <div class="course-box__teacher">
                  <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                  <a class="course-box__teacher-link">${course.creator}</a>
                </div>

                <div class="course-box__raiting">
                ${Array(course.courseAverageScore).fill(0).map( (star) =>
                      ' <img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">'
                  ).join("")}
                
                ${Array(5 - course.courseAverageScore).fill(0).map((score) =>
                      ' <img src="./images/svgs/star.svg" alt="" class="course-box__star">'
                  ).join("")}              
                </div>
              </div>
       
              <div class="course-bos__status">
                <div class="course-box__users">
                  <i class="fas fa-users course-box__users-icon"></i>
                  <span class="course-box__text">${course.registers}</span>
                </div>
             
                <div class="courses-box__price">
                ${course.price === 0 ? "Free" :'' }

                ${  (course.price !== 0 && course.discount) ?
                   `
                    <span class="courses-box__price-discount">
                    ${(course.price - (course.price * course.discount / 100)).toLocaleString()} $
                    </span>
                    <span class="courses-box__price courses-box__undiscount">${course.price.toLocaleString()}$</span>
                  `
                  :
                  `
                   <span class="courses-box__price ">${course.price.toLocaleString()}$</span>
                 `
                }
              </div>
             
              </div>
            </div>
            <div class="course-box__footer">
              <a class="course-box__footer-link">View Info
       
                <i class="fas fa-arrow-right course-box__footer-icon"></i>
              </a>
            </div>
            ${
              course.discount && course.price !== 0 ? `
                <span class="courses-box__discount">${course.discount}%</span>
              ` : ``
            }
          </div>
      
        </div>
       `
        )
       } 
      )
      
    });
};

const getAndShowArticles = async () => {
  const articlesContainer = document.querySelector("#articles-container");
  const allArticles = await fetch("http://localhost:4000/v1/articles");
  const res = await allArticles.json();

  res.slice(0, 3).map((article) => {
    articlesContainer.insertAdjacentHTML(
      "beforeend",

      `
    <div class="col-4">
    <div class="article-box">
     <a href= href=./../../blog.html?article-name=${article.shortName}>
       <img src=http://localhost:4000/courses/covers/${article.cover} alt="article" class="article-box__img">
     </a>
     <div class="article-box__main">
       <a class="article-box__title" href=./../../blog.html?article-name=${article.shortName}>
        ${article.title}
       </a>
       <p class="article-box__text">${article.description}
       </p>
       <div class="article-box__btn">
         <a  href=./../../blog.html?article-name=${article.shortName} class="articel__link">Read more...</a>
       </div>
     </div>
   </div>
   </div>
    `
    );
  });
};

const getAllMenues = async () => {
  const menuesWrapper = document.querySelector(".main-header__menu");
  const res = await fetch("http://localhost:4000/v1/menus");
  const menues = await res.json();

  menues.map((menu) => {
      menuesWrapper.insertAdjacentHTML(
      "beforeend",
      `
<li class="main-header__item">
<a href=/category.html?cat=${menu.href}&page=1 class="main-header__link">${menu.title}
${menu.submenus.length !== 0  ?
   `
  <i class="fas fa-angle-down main-header__link-icon"></i>
  <ul class="main-header__dropwon">
  ${menu.submenus.map((submenu) =>
        ` 
   <li class="main-header__dropdown-item">
     <a href="/course-info.html?name=${submenu.href}" class="main-header__dropwon-link"> ${submenu.title} </a>
   </li>
   `
    )
    .join("")}
   </ul>

 `
    : ""
}

</a>
</li>
`
    );
  });
};
 
/* category_page  strat */
const getAndShowCategoryCourses =async()=>{
const categoryName= getUrlParam('cat');
const res=await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
const categoryItems=await res.json()
return categoryItems
}

const showCourses = (courses,showMethod) => {
  const categrotyContainer = document.querySelector("#category-container");
  categrotyContainer.innerHTML='';
  courses.length !== 0 ? 
(  
showMethod === 'row' ? (courses.map((course) =>
categrotyContainer.insertAdjacentHTML(
  "beforeend",
  `
<div class="col-4">
<div class="course-box">
<div class="discount-box"></div>
 <a href="/course-info.html?name=${course.shortName}">
<img src=./images/courses/${course.cover} alt=${
  course.shortName
  } class="course-box__img">
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
${Array(course.courseAverageScore).fill(0).map((item) =>
      `<img src="./images/svgs/star_fill.svg" alt="" class="course-box__star">`
  ).join("")}

      ${Array(5 - course.courseAverageScore).fill(0).map((item) =>
            `<img src="./images/svgs/star.svg" alt="" class="course-box__star">`
        ).join("")}
      
      </div>
      </div>
      
      <div class="course-bos__status">
      <div class="course-box__users">
      <i class="fas fa-users course-box__users-icon"></i>
      <span class="course-box__text">${course.registers}</span>
      </div>
      ${
        course.price !== 0
          ? `<div class="course-box__price">${course.price.toLocaleString()} $</div>`
          : `<div class="course-box__price">Free</div>`
      }
      
      </div>
      </div>
      <div class="course-box__footer">
      <a class="course-box__footer-link">View Info
      
      <i class="fas fa-arrow-right course-box__footer-icon"></i>
      </a>
      </div>
      </div>
      </div>
      
      `
)
)
) : (
courses.forEach((course) => {
  categrotyContainer.insertAdjacentHTML(
    "beforeend",
    `
            <div class="col-12">
            <div class="course-box">
                <div class="course__box-header">
                    <div class="course__box-right ">
                        <a class="course__box-right-link" href="#">
                            <img src=http://localhost:4000/courses/covers/${
                              course.cover
                            } class="course__box-right-img">
                        </a>
                    </div>
                    <div class="course__box-left">
                        <div class="course__box-left-top">
                            <a href="#" class="course__box-left-link">${
                              course.name
                            }</a>
                        </div>
                        <div class="course__box-left-center">
                            <div class="course__box-left-teacher">
                                <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                <span class="course__box-left-name">${
                                  course.creator
                                }</span>
                            </div>
                            <div class="course__box-left-stars">
                              ${Array(5 - course.courseAverageScore)
                                .fill(0)
                                .map(
                                  (score) =>
                                    '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                                )
                                .join("")}
                              ${Array(course.courseAverageScore)
                                .fill(0)
                                .map(
                                  (score) =>
                                    '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                                )
                                .join("")}
                            </div>
                        </div>
                        <div class="course__box-left-bottom">
                            <div class="course__box-left-des">
                                <p>Nowadays, libraries have made coding much easier and more enjoyable. so much
                                That
                                Even today, no programming company implements its projects with Vanilla Js
                                making
                                does not and always uses existing libraries and frameworks. So
                                you too
                                If you want to be a great front-end developer, you need libraries
                                Practical
                                Know well which are used in the job market
                                             </p>
                            </div>
                        </div>
                        <div class="course__box-footer">
                            <div class="course__box-footer-right">
                                <i class="course__box-footer-icon fa fa-users"></i>
                                <span class="course__box-footer-count">${
                                  course.registers
                                }
                                </span>
                            </div>
                            <span class="course__box-footer-left">${
                              course.price === 0
                                ? "Free"
                                : course.price.toLocaleString()
                            }
                              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
  );
})
)

)
    : 
   ( categrotyContainer.insertAdjacentHTML(
        "beforeend",
        '<div class="alert alert-danger m-t2" >There is no course in this Category or search</div>'
      ))

};

const coursesSorting = (array, filterMethod) => {
  let outputArray = [];
  
  switch(filterMethod) {
    case 'free': {
      outputArray = array.filter(course => course.price === 0)
      break
    }
    case 'money': {
      outputArray = array.filter(course => course.price !== 0)
      break
    }
    case 'first': {
      outputArray = [...array].reverse()
      break
    }
    case 'last': {
      outputArray = array
      break
    }
    case 'default': {
      outputArray = array
      break
    }
    default: {
      outputArray = array
    }
  }

  return outputArray
}
/* category_page  finish */
function getInfosIndex(){
  const topbarEmailElem=document.querySelector('#topbar-email');
const topbarPhoneElem=document.querySelector('#topbarPhone');
  fetch('http://localhost:4000/v1/infos/index')
  .then(res=>res.json())
  .then(infos=>{
    topbarEmailElem.innerHTML=infos.email;
     topbarPhoneElem.innerHTML=infos.phone;
   
  })
}

const submitNewsLetter=async()=>{
  const newsLetterInput=document.querySelector('.login-form__password-input');
  const newsLetterEmail={
   email: newsLetterInput.value.trim()}

 const res=await fetch(`http://localhost:4000/v1/newsletters`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    
    },
body:JSON.stringify(newsLetterEmail)
  })

  if (res.status === 400) {
    showSwal(
      "Enter your email address correctly",
        "warning",
        "Ok  ",
      () => {
        newsLetterInput.value='';
       console.clear();
      }
    );
  }
  if (res.ok) {
    showSwal(
      "You have successfully joined Sabzlern newsletter",
        "success",
        "Ok  ",
      () => {newsLetterInput.value=''}
    );
  }
}

const breadcrumb =(breadCrumbWrapper ,breadCrumbDetails)=>{
breadCrumbWrapper.insertAdjacentHTML('beforeend',
`
<li class="breadcrumb__item">
                        <a href=/category.html?cat=${breadCrumbDetails.categoryID.name}&page=1 class="breadcrumb__link">
                           ${breadCrumbDetails.categoryID.title}
                            <i class="breadcrumb__icon fas fa-angle-right"></i>
                        </a>
                    </li>
                    <li class="breadcrumb__item">
                        <a href="#" class="breadcrumb__link">

                          ${breadCrumbDetails.title ? breadCrumbDetails.title : breadCrumbDetails.name}

                        </a>
                    </li>
`
)
}
export {
  renderTopbarMenus,
  showUserNameInNavbar,
  getAllMenues,
  breadcrumb,
  getAllAndShowCourses,
  getpopularAndShowCourses,
  getPresellAndShowCourses,
  getAndShowArticles,
  getAndShowCategoryCourses,
  showCourses,
  coursesSorting,
  submitNewsLetter,
  getInfosIndex
};
