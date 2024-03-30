import { getToken, showSwal } from "../funcs/utils.js";
const token = getToken();
const creatSessionElem=document.querySelector('#create-session');
const selectFreeElem=document.querySelector('#select-free');
const selectCourseElem=document.querySelector('#select-course');
const selectVideoElem=document.querySelector('.video-select');


let freeFlag=0;
let courseID;
let courseVideo=null;
const getAllSessions = async () => {
  const res = await fetch("http://localhost:4000/v1/courses/sessions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = res.json();
  return result;
};
const insertCoursesyInCoursesList=async()=>{
    const res=await fetch("http://localhost:4000/v1/courses");
    const courses = await res.json()
   
    courses.forEach(course =>{
           console.log(course);

            selectCourseElem.insertAdjacentHTML('beforeend',(
        
        `
        <option value="${course._id}">${course.name}</option>
        `
            ))
        })
   
}
const showSessions = () => {
  const sessionListElem = document.querySelector("#list-sessions");
  sessionListElem.innerHTML='';
  getAllSessions().then((sessions) => {
 
    sessions.forEach((session, index) => {
        console.log(session);
        sessionListElem.insertAdjacentHTML(
        "beforeend",

        `
           <tr>
           <td>${index + 1}</td>
           <td>${session.course !== null ? session.course.name :'Course is deleted' }</td>
           <td>${session.title}</td>
           <td>${session.createdAt.slice(0,10)}</td>
           <td>${session.time}</td>
           <td>${session.free !==0 ? 'None-Free' : 'Free'}</td>
           
          
           <td>
               <button type='button' class='btn btn-primary edit-btn'>Edit</button>
           </td>
           <td>
               <button type='button' class='btn btn-danger delete-btn' onclick="deleteSession('${session._id}')" >Delete</button>
           </td>
           </tr>
    `
      ); 
    });
  });
};
selectFreeElem.addEventListener('change',(event)=> freeFlag= event.target.value);
selectCourseElem.addEventListener('change',event=>courseID= event.target.value);
selectVideoElem.addEventListener('change',(event)=>courseVideo=event.target.files[0]);

const createNewSession=()=>{
 
    const titleInput = document.querySelector("#title");
    const timeInput = document.querySelector("#time");
   
 let formData=new FormData();
formData.append('title',titleInput.value.trim(),)
formData.append('time',timeInput.value.trim(),)
formData.append('video',courseVideo,)
formData.append('free',freeFlag,)

    fetch(`http://localhost:4000/v1/courses/${courseID}/sessions`, {
      method: "POST",
      headers: {
      
        Authorization:`Bearer ${token}`
      },
      body: formData
    })
      .then((res) => {
      if (res.status === 201) {
          showSwal(
            "New session  successfully Added",
            "success",
            "OK  ",
            () => {showSessions() }
          );
        } else if (res.status === 409) {
          showSwal(
            "There is a problem",
            "error",
            "correction of information",
            () => {}
          );
        }
       
        
    })  
   
   }

creatSessionElem.addEventListener('click',(event)=>{
    event.preventDefault();
    createNewSession()
})

const deleteSession=async (sessionID)=>{
    showSwal(
        "Are you sure for delete this session ?!",
        "warning",
        ["NO","Yes"],
        (result) => { 
            if(result){
                fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`,{
                   method:'DELETE',
                   headers:{
                       Authorization:`Bearer ${token}`
                   }
               }).then(res=>{
                   if (res.ok) {
                       showSwal(
                         "The session lesson was successfully deleted",
                         "success",
                         "OK  ",
                         () => {showSessions() }
                       );
                     } 
                     else{
                        showSwal(
                            "There was a problem deleting the session",
                            "warning",
                            "OK  ",
                            () => { }
                          );
                     }
                   
                   })
   
                   }
   


        } )
   
   
}

window.deleteSession=deleteSession
window.addEventListener('load',()=>{
    showSessions();
    insertCoursesyInCoursesList()
})