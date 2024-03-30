import { showUserNameInNavbar,  renderTopbarMenus,  getAllMenues ,submitNewsLetter ,getInfosIndex, breadcrumb} from "./funcs/sheared.js";
import { getUrlParam , getToken ,showSwal} from "./funcs/utils.js";

let courseName=getUrlParam('name');
const sendComment=document.querySelector('.comments__respond-btn');
const token = getToken();

const getAndShowRelatedCourses=async()=>{
  const res=await fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
  const relatedCourses=await res.json()
  return relatedCourses
}


const getAndShowCourseInfo=async()=>{
  const token=getToken()
const res= await fetch(`http://localhost:4000/v1/courses/${courseName}`,{
  headers: {
    Authorization: `Bearer ${token}`
}
})
const courseInfos=await res.json()
return courseInfos
} 

const showAccordion=()=>{
  const accordionItem=document.querySelector('.accordion-item');
  getAndShowCourseInfo().then((course)=>{
    course.sessions.map((session,index) =>(
      accordionItem.insertAdjacentHTML('beforeend' , 
        `
        <div id="collapse" class="accordion-collapse collapse "    aria-labelledby="heading"   data-bs-parent="#accordionExample">
        <div class="accordion-body introduction__accordion-body" id=accordiionBody>
        <div class="introduction__accordion-right">
        <span class="introduction__accordion-count">${index+1}</span>
        <i class="fab fa-youtube introduction__accordion-icon"></i>
        ${(course.isUserRegisteredToThisCourse || course.price === 0) ?
        ` <a href="episode.html?name=${course.shortName}&id=${session._id}"
            class="introduction__accordion-link">
            ${session.title}
        </a>`
        :
        ` <span class="introduction__accordion-link">
            ${session.title}
        </span>        
        `
      }
      </div>
  <div class="introduction__accordion-left">
    ${(course.isUserRegisteredToThisCourse || course.price ===0) ?

     ` <span class="introduction__accordion-time">
      ${session.time}
  </span>
    ` : `
     <span class="introduction__accordion-time">
    ${session.time}
</span>
 <i class="fa fa-lock"></i>
    `
    }
    </div>
  
    </div>
</div>
    `
      )))
        }
  )   
  }

const showCourseMain=()=>{  
    const courseInfoLink=document.querySelector('.course-info__link');
    const courseTitle=document.querySelector('.course-info__title');
    const coursedescribe=document.querySelector('.course-info__text');
    const courseVideo=document.querySelector('.course-info__video');
    const courseBoxStatusCompleted=document.querySelector('#courseBoxStatusCompleted');
    const courseBoxUpdate=document.querySelector('#courseBoxUpdate');
    const courseBoxSuport=document.querySelector('#courseBoxSuport');
    const introductionTitle=document.querySelector('#intoductionTitle');
    const techerName=document.querySelector('.techer-details__header-link');
    const teacherCover=document.querySelector('.techer-details__header-img');
    const techerDetailsHeaderSkill=document.querySelector('.techer-details__header-skill');
    const breadCrumbWrapper=document.querySelector('.breadcrumb__list');
  
    getAndShowCourseInfo().then(course=>{
        courseInfoLink.innerHTML=course.categoryID.title;
        courseInfoLink.setAttribute('href',`/category.html?cat=${course.categoryID.name}`);
        courseTitle.innerHTML=course.name;
        coursedescribe.innerHTML=course.description;
        courseVideo.setAttribute('poster',`http://localhost:4000/courses/covers/${course.cover }`);
        courseBoxStatusCompleted.innerHTML= `${course.isComplete === 0 ? 'finished' : 'On performing' }`;
        courseBoxUpdate.innerHTML=` ${course.updatedAt.slice(0,10)}`
        courseBoxSuport.innerHTML=course.support;
        introductionTitle.innerHTML=course.name;
        techerName.innerHTML=course.creator.name;
        teacherCover.setAttribute('src',course.creator.profile);
        techerDetailsHeaderSkill.innerHTML= course.creator.email;
        breadcrumb(breadCrumbWrapper,course)  
          })
 }


const showRelatedCourse=()=>{
  const courserelatedList=document.querySelector('.course-info__courses-list');
getAndShowRelatedCourses().then(relatedCourses=>{

if(relatedCourses.length !==0){
relatedCourses.map(relatedCourse=>(
  courserelatedList.insertAdjacentHTML('beforeend', 
  `
  <li class="course-info__courses-list-item">
                            <a href="/course-info.html?name=${relatedCourse.shortName}"
                                class="course-info__courses-link">
                                <img src="/images/courses/${relatedCourse.cover}" alt="Course Cover"  class="course-info__courses-img" />
                                <span class="course-info__courses-text">
                                    ${relatedCourse.name}
                                </span>
                            </a>
                        </li>
  `
  )
))
}})
}

const getAndShowComments = ()=>{
  const commentsWrapper=document.querySelector('.comments__content');
  getAndShowCourseInfo().then(course=>{
    course.comments.length !==0 ? ( 
      commentsWrapper.insertAdjacentHTML('beforeend',
    `
    ${course.comments.map(comment =>
      (
      `
      <div class="comments__item">                  
          <div class="comments__question-header">
              <div class="comments__question-header-right">
                  <span class="comments__question-name comment-name">
                      ${comment.creator ? comment.creator.name : ''}
                  </span>
                  <span class="comments__question-status comment-status">(product
                      buyer)</span>
                  <span
                      class="comments__question-date comment-date">${comment.updatedAt.slice(0,10)}</span>
              </div>
              <div class="comments__question-header-left">
                  <a class="comments__question-header-link comment-link"
                      href="#">Response</a>
              </div>
          </div>
          <div class="comments__question-text">
              <p class="comments__question-paragraph comment-paragraph">${comment.body}
              </p>
          </div>

          ${comment.answerContent !== null ? (

            `
            <div class="comments__ansewr">
                <div class="comments__ansewr-header">
                    <div class="comments__ansewr-header-right">
                        <span
                            class="comments__ansewr-name comment-name">${comment.answerContent.creator.name}
                        </span>
                        <span class="comments__ansewr-staus comment-status">( Teacher )</span>
                        <span
                            class="comments__ansewr-date comment-date">${comment.answerContent.createdAt.slice(0,10)}</span>
                    </div>
                    <div class="comments__ansewr-header-left">
                        <a class="comments__ansewr-header-link comment-link"
                            href="#">Response</a>
                    </div>
                </div>
                <div class="comments__ansewr-text">
                    <p class="comments__ansewr-paragraph comment-paragraph">
                        ${comment.answerContent.body} </p>
                </div>
      
      
            </div>
           
            `
            ):('')
  }
          
       </div>
     

      `
      )
      )
    }
      `
    )
    ) : (
      commentsWrapper.insertAdjacentHTML('beforeend',`
    
      <div class="alert alert-danger m-5 " >There is no comment for this course</div>
      `)
    )
  })
}

const submitComment=async()=>{
const commentScore=document.querySelector('#comment-score')  ;
const commentsRespondElem=document.querySelector('.comments__score-input-respond');
let score=5;
 commentScore.addEventListener('change',()=>score=commentScore.value);
 const newCommentInfos={
  body:commentsRespondElem.value.trim(),
  score,
  courseShortName:courseName
 }
const res=await fetch(`http://localhost:4000/v1/comments`,{
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    Authorization:`Bearer ${token}`
  },
  body:JSON.stringify(newCommentInfos)
})

if(res.ok){
  showSwal('Your comment successfuly submited' , 'success','Ok',()=>{
    commentsRespondElem.value='';
  })
}else{showSwal('There was a problem submit the comment' , 'warning','Ok',()=>{})}
}
sendComment.addEventListener('click',()=>{
  submitComment();
})
const showCourseSidebar=()=>{
  const sidebarRegister=document.querySelector('.course-info__register');
  const courseTotalSaleNumber=document.querySelector('.course-info__total-sale-number');
  const courseTotalCommentText=document.querySelector('.course-info__total-comment-text')
getAndShowCourseInfo().then(course =>{
  sidebarRegister.innerHTML='';
  sidebarRegister.insertAdjacentHTML('beforeend',
  `
  <div class="comments__question">
${course.isUserRegisteredToThisCourse ? 
  `<span class="course-info__register-title">
      <i class="fas fa-graduation-cap course-info__register-icon"></i>
      You Are Student This Course
  </span>
`
  :
` <button class="course-info__register-title" onclick="registerInCourse('${course._id}' , '${course.price} ')">
      <i class="fas fa-graduation-cap course-info__register-icon"></i>
      Register this course
  </button>`
}
</div>
 `
)
courseTotalSaleNumber.innerHTML=course.courseStudentsCount;
courseTotalCommentText.innerHTML=` ${course.comments.length} point of view`
})
  }

const registerInCourse=  (courseID,coursePrice)=>{
  let coursePriceObj={
    price:coursePrice
  }

if(coursePrice == 0){                                           ////////////// register in free course
  swal({
    title:'Are you sure for register in this Course?',
    icon:'warning',
    buttons:['NO','YES']
  }).then(result =>{
    if(result){
      fetch(`http://localhost:4000/v1/courses/${courseID}/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({price:coursePrice})
      }).then(res=>{

        if(res.ok){
          showSwal('You successfuly in this Course  registered' , 'success','Ok',()=>{ showCourseSidebar(), showAccordion() })
        }else{showSwal('There was a problem in register' , 'warning','Ok',()=>{})} 
      })
    }
  } )
  }
  else {    
                                                            ///// register in mony course
   swal({
     title:'Are you sure for register in this Course?',
     icon:'warning',
     buttons:['NO','YES']
   }).then(async result =>{
     if(result){
      swal({
        title:'Have you off Code!?',
        icon:'warning',
        buttons:'Submit',
       content:'input'
      }).then(async offCode =>{
        if(offCode){                                                //// register in mony course with off code
          fetch(`http://localhost:4000/v1/offs/${offCode}`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({course:courseID})
          }).then(async res=>{
            if(res.status ===200){
            let percentCode=await res.json();
              fetch(`http://localhost:4000/v1/courses/${courseID}/register`,{        ////// test code off
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                  Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({price: coursePrice - (coursePrice * percentCode.percent /100) })
              }).then(res=>{

                if(res.ok){
                  showSwal('You successfuly in this Course  registered' , 'success','Ok',()=>{ showCourseSidebar(), showAccordion() })
                }
                else{
                  showSwal('There was a problem in register  ' , 'warning','Ok',()=>{})
                }
              })
            }
              if (res.status ===409){
                showSwal('This code has already been used' , 'warning','Ok',()=>{})
              }
              if (res.status ===404){
                showSwal('This code is not valid' , 'warning','Ok',()=>{})
              }
            
            
          })
  
  
        }
        else{                                                      //// register in mony course withoud off code

          fetch(`http://localhost:4000/v1/courses/${courseID}/register`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({price:coursePrice})
          }).then(res=>{
    
            if(res.ok){
              showSwal('Your comment successfuly submited' , 'success','Ok',()=>{ location.reload() })
            }else{showSwal('There was a problem submit the comment' , 'warning','Ok',()=>{})} 
          })
  
      }
      })

     }
     else {
             ////////////////   reject all register
     }
    })
  }
}
const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter()
})


window.registerInCourse=registerInCourse
window.addEventListener('load' ,()=>{
    showUserNameInNavbar();
    renderTopbarMenus();
    getAllMenues();
    showCourseMain();
    getAndShowComments();
    showCourseSidebar();
    showAccordion();
    showRelatedCourse();
    getInfosIndex();
})
  