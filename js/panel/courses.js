import { getToken , showSwal} from "../funcs/utils.js";
const createCourseBtn=document.querySelector('#create-course-btn');
const imgSelected=document.querySelector('#file');
const selectCategory=document.querySelector('#selectCategory');
const courseStatusPresellElm=document.querySelector('#presell');
const courseStatusStartElm=document.querySelector('#start');
let courseImg=null;
let categoryId = '-1';
let courseStatus='start';


const getAllcategory=async()=>{
    const res=await fetch('http://localhost:4000/v1/category')
    const result =res.json()
    return result
}
const getAllcourses=async()=>{
const res=await fetch("http://localhost:4000/v1/courses");
const courses = await res.json();
return courses
}

const showCourses=()=>{
    const listCoursesTable=document.querySelector('#listCoursesTable');
    listCoursesTable.innerHTML='';
    getAllcourses().then(courses =>{
    
        courses.forEach((course, index) => {
            listCoursesTable.insertAdjacentHTML('beforeend', 
            `
            <tr>
            <td>
                <input type="checkbox" class="checkbox-table form-check-input">
            </td>

            <td id="id">${index+1}</td>
            <td id="name">  ${course.name}  </td>
            <td id="price">${course.price === 0 ? 'Free' : course.price.toLocaleString()}</td>
            <td id="condition">${course.registers}</td>
            <td id="support">${course.support}</td>
            <td id="category">${course.categoryID.title }</td>
            <td id="courseAverageScore">${course.courseAverageScore }</td>
            <td id="isComplete ">${course.isComplete === 0 ? 'On performing' : 'Finished'}</td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" id="delete-btn" onclick="removeCourse('${course._id}')">Delete</button>
            </td>
        </tr>
            `
            )
        });
    
    })
}

selectCategory.addEventListener('change',(event)=>categoryId=event.target.value);

const insertCategoryInCategoryList=()=>{
    getAllcategory().then(allCategory=>{
        allCategory.forEach(category =>{
            console.log(category)

            selectCategory.insertAdjacentHTML('beforeend',(
        
        `
        <option value="${category._id}">${category.title}</option>
        `
            ))
        })
    });
}

imgSelected.addEventListener('change',(event)=>{
    courseImg=event.target.files[0];
})

const removeCourse=(courseId)=>{
    const token=getToken();
    swal( 
        {title: "Are you sure for delete this Course ?!",
    icon: "warning",
    buttons: ["No", "Yes"]},

    ).then(result =>{
        if(result){
            fetch(`http://localhost:4000/v1/courses/${courseId}`,{
                method:'DELETE',
                headers:{
                    Authorization:`Bearer ${token}`
                },
            })
          
            .then(res=>{
                console.log(res);
                if (res.ok) {
                    swal({
                      title: "The Course deleted successfully  ",
                      icon: "success",
                      buttons: "Ok",
                    }).then(() => {
                     showCourses(); 
                    });
                  }
                  else{
                    swal({
                      title: "There was a problem deleting the course.",
                      icon: "error",
                      buttons: "Ok",
                    });
                  } 
                }
            )
          
        }
    })
   
}



const addNewCoursInfos=()=>{
    const token=getToken();
    let formData=new FormData();
  
   const  courseNameElm=document.querySelector('#name');
   const  courseDescriptionElm=document.querySelector('#description');
   const  courseShortNameElm=document.querySelector('#shortName');
   const  coursePriceElm=document.querySelector('#price');
   const  courseSupportElm=document.querySelector('#support')


formData.append('name',courseNameElm.value.trim());
formData.append('description',courseDescriptionElm.value.trim());
formData.append('shortName',courseShortNameElm.value.trim());
formData.append('categoryID',categoryId);
formData.append('price',coursePriceElm.value.trim());
formData.append('cover',courseImg);
formData.append('support',courseSupportElm.value.trim());
formData.append('status',courseStatus);



if(categoryId === '-1'){
    showSwal('Please select one category','warning','Ok',()=>{showCourses()})
}else {
 
  fetch('http://localhost:4000/v1/courses',{
    method:'POST',
    headers:{
            "Authorization":`Beare ${token}`
        },
        body:formData
    }).then((res)=>{
        if(res.ok){

            showSwal('this course successfully added','info','ok',()=>{showCourses()})
        }else{
           showSwal('there is one error','warning','ok',()=>{})

        }
    })

    } 
}


createCourseBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    addNewCoursInfos();
})


courseStatusPresellElm.addEventListener("change", (event) => {(status = event.target.value)  } );
courseStatusStartElm.addEventListener( "change", (event) => {(status = event.target.value)  } );


  window.removeCourse=removeCourse
window.addEventListener('load',()=>{
    showCourses();
    insertCategoryInCategoryList()

})