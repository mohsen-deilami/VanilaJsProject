const courseBoxWrapper = document.querySelector("#courseBox-wrapper");
const courseFilterElem = document.querySelectorAll(".course-filter-link");
let courses=[];
;
const token = getToken();
const getAllCourses = async () => {
  const res = await fetch("http://localhost:4000/v1/users/courses/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  courses = await res.json();
  return courses;
};

courseFilterElem.forEach((filterLink) => {                                    //// active and deactive menu && filtering
  filterLink.addEventListener("click", (event) => {
    event.preventDefault();
    courseFilterElem.forEach(filterLink =>filterLink.classList.remove("courses-header__link-active"));
    event.target.classList.add("courses-header__link-active");
    let filteredCourses =null;
    let filterMethod=event.target.dataset.filter;

    switch (filterMethod){       
        case 'free':{
             filteredCourses=[...courses].filter(course=>course.price === 0);     
              break;          
        }
        case 'nonFree':{
             filteredCourses=[...courses].filter(course=>course.price !== 0);
             break;             
            }
            case 'active':{
               filteredCourses=[...courses].filter(course=>course.course.isComplete  !== 0);
       
              break;
            }
            case 'complete':{
               filteredCourses=[...courses].filter(course=>course.course.isComplete  === 0);
           
              break;
            }
            
            default:{
              filteredCourses= [...courses];
              break;
        }
    }
    return insetCourseboxtmlTamplate(filteredCourses);
  });
});

const insetCourseboxtmlTamplate=(array)=>{
 
    courseBoxWrapper.innerHTML = "";
    if (array.length !== 0) {
      array.map((course) =>
          courseBoxWrapper.insertAdjacentHTML(
            "beforeend",
            `
                  <div class="main__box">
                
                  <div class="main__box-left">
                      <a href="./../../course-info.html?name=${course.course.shortName}" class="main__box-title">${
                        course.course.name
                      }  </a>
                      <div class="main__box-bottom">
                          <div class="main__box-all">
                              <span class="main__box-all-text">Price :</span>
                              <span class="main__box-all-value">${  course.price === 0 ? "Free" : course.price.toLocaleString()} $</span>
                          </div>
                          <div class="main__box-completed">
                              <span class="main__box-completed-text">Course Status  :</span>
                              <span class="main__box-completed-value">${course.course.isComplete !==0 ? 'Active' : 'Completed' }</span>
                          </div>
                          <div class="main__box-completed">
                              <span class="main__box-completed-text"> Date updated :</span>
                              <span class="main__box-completed-value">${course.course.updatedAt.slice(  0,  10  )}</span>
                          </div>
                      </div>
                  </div>
                  <div class="main__box-right">
                  <a class="main__box-img-link" href="./../../course-info.html?name=${course.course.shortName}">
                      <img class="main__box-img img-fluid"
                          src="http://localhost:4000/courses/covers/${
                            course.course.cover
                          }">
                  </a>
              </div>
              </div>
                  `
          )
        );
      } else {
        courseBoxWrapper.insertAdjacentHTML(
          "beforeend",
          `
              <div className="alert alert-danger">You dont any courses this filter registered...</div>
              `
        );
      }

  
}

const showCoursesAll = () => {
  courseBoxWrapper.innerHTML = "";
  getAllCourses().then((courses) => {
    console.log(courses);
    if (courses.length !== 0) {
      courses.map((course) =>
        courseBoxWrapper.insertAdjacentHTML(
          "beforeend",
          `
                <div class="main__box">
              
                <div class="main__box-left">
                    <a href="./../../course-info.html?name=${course.course.shortName}" class="main__box-title">
                    ${
                      course.course.name
                    }  </a>
                    <div class="main__box-bottom">
                        <div class="main__box-all">
                            <span class="main__box-all-text">Price :</span>
                            <span class="main__box-all-value">${course.price === 0   ? "Free" : course.price.toLocaleString() } $</span>
                        </div>
                        <div class="main__box-completed">
                            <span class="main__box-completed-text">Course Status  :</span>
                            <span class="main__box-completed-value">${course.course.isComplete !==0 ? 'Active' : 'Completed' }</span>
                        </div>
                        <div class="main__box-completed">
                            <span class="main__box-completed-text"> Date updated :</span>
                            <span class="main__box-completed-value">${course.course.updatedAt.slice( 0, 10 )}</span>
                        </div>
                    </div>
                </div>
                <div class="main__box-right">
                <a class="main__box-img-link" href="./../../course-info.html?name=${course.course.shortName}">
                    <img class="main__box-img img-fluid"
                        src="http://localhost:4000/courses/covers/${ course.course.cover }">
                </a>
            </div>
            </div>
                `
        )
      );
    } else {
      courseBoxWrapper.insertAdjacentHTML(
        "beforeend",
        `
            <div className="alert alert-danger">You dont any courses registered...</div>
            `
      );
    }

  });
};

window.addEventListener("load", () => {
  showCoursesAll();
});
