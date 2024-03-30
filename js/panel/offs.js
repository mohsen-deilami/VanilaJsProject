import { getToken, showSwal } from "../funcs/utils.js";
const selectCourseElem = document.querySelector("#select-course");
const createOffElem=document.querySelector('#create-off');

let courseID;
const token = getToken();

const getAllOffs = async () => {
  const res = await fetch("http://localhost:4000/v1/offs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  return result;
};

const showOffs = () => {
  const discounttListElem = document.querySelector("#list-discount");
  discounttListElem.innerHTML = "";
  getAllOffs().then((offs) => {
    console.log(offs);
    offs.forEach((off, index) => {
      discounttListElem.insertAdjacentHTML(
        "beforeend",

        `
             <tr>
             <td>${index + 1}</td>
             <td>${off.code}</td>
             <td>${off.creator ? off.creator : "--"}</td>
             
             <td>${off.percent}%</td>
             <td>${off.max}</td>
             <td>${off.uses}</td>
             <td>${off.createdAt.slice(0, 10)}</td>
            
            
           
             <td>
                 <button type='button' class='btn btn-primary delete-btn' onclick="editOff('${off._id}')">Edit</button>
             </td>
             <td>
                 <button type='button' class='btn btn-danger delete-btn' onclick="removeOff('${off._id}')">Delete</button>
             </td>
             </tr>
      `
      );
    });
  });
};

const insertCoursesyInCoursesList = async () => {
  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json();
  courses.forEach((course) => {
    selectCourseElem.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${course._id}">${course.name}</option>
        `
    );
  });
};

selectCourseElem.addEventListener("change", event => courseID = event.target.value);

const createNewOff = () => {
  const titleCodeInput = document.querySelector("#off-code");
  const precentInput = document.querySelector("#perecent");
  const maxInput = document.querySelector("#max-off");
  const newOffObj = {
    code: titleCodeInput.value.trim(),
    percent: precentInput.value.trim(),
    course: courseID,
    max: maxInput.value.trim(),
  };

  fetch(`http://localhost:4000/v1/offs`, {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newOffObj),
  }).then((res) => {
    if (res.ok ) {
      showSwal("New session  successfully Added", "success", "OK  ", () => {
        showOffs();
      });
    } else 
   {
      showSwal(
        "There is a problem",
        "error",
        "correction of information",
        () => {}
      );
    }
  });
};
createOffElem.addEventListener('click',(event)=>{
  event.preventDefault();
  createNewOff();
})



const removeOff=async (offId)=>{
  showSwal(
      "Are you sure for delete this off ?!",
      "warning",
      ["NO","Yes"],
      (result) => { 
          if(result){
              fetch(`http://localhost:4000/v1/offs/${offId}`,{
                 method:'DELETE',
                 headers:{
                     Authorization:`Bearer ${token}`
                 }
             }).then(res=>{
                 if (res.ok) {
                     showSwal(
                       "The Off was successfully deleted",
                       "success",
                       "OK  ",
                       () => {showOffs() }
                     );
                   } 
                   else{
                      showSwal(
                          "There was a problem deleting the off",
                          "warning",
                          "OK  ",
                          () => { }
                        );
                   }
                 
                 })
 
                 }
 
      } )
 
}
window.removeOff=removeOff
window.addEventListener("load", () => {
  showOffs();
  insertCoursesyInCoursesList();
});
