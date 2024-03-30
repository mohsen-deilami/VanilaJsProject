import { getToken , showSwal} from "../funcs/utils.js";
const token=getToken();
const departementSelectionElem=document.querySelector('#departements-selection');
const subDepartementSelectionElem=document.querySelector('#subDepartements-selection');
const userCoursesElem=document.querySelector('#user-courses');
const priorityElem=document.querySelector('#priority');
const ticketTitleElem=document.querySelector('#ticket-title');
const ticketBodyElem=document.querySelector('#ticket-body');
const submitBtn=document.querySelector('#submit-btn');
const courseNameSectionElem=document.querySelector('#course-name-section');
let departementID='-1';
let departmentSubID= '-1';
let userCoursesID=undefined;
let priority='-1';

const insetDepartementItemsInSelect=async ()=>{
    const res=await fetch('http://localhost:4000/v1/tickets/departments')
    const departementsList=await res.json()
    .then(departemets=>{
        departemets.forEach(departement=>{
            departementSelectionElem.insertAdjacentHTML('beforeend',
            `
            <option class="ticket-form__option" value=${departement._id}>${departement.title}</option>
            `
            )
        })
    })
}

departementSelectionElem.addEventListener('change',(event)=>{
     departementID= event.target.value;
    insetSubDepartementItemsInSelect(departementID).then(subDepartements=>{
        subDepartementSelectionElem.innerHTML=`<option class="ticket-form__option" value="='-1"> Please choose one.</option>`
          subDepartements.forEach(subDepartement=>{

            subDepartementSelectionElem.insertAdjacentHTML('beforeend',
            `
            <option class="ticket-form__option" value=${subDepartement._id}>${subDepartement.title}</option>
            
            `
            )
        })
    })
})

subDepartementSelectionElem.addEventListener('change',event=>{
    departmentSubID=event.target.value;

if(event.target.value === '63b688c5516a30a651e98156'){
    courseNameSectionElem.classList.remove('d-none');
}else{
    courseNameSectionElem.classList.add('d-none');

}
})

userCoursesElem.addEventListener('change',event=>{
    userCoursesID=event.target.value
    console.log( event.target.value)
});
priorityElem.addEventListener('change',event=>priority=event.target.value);

const insetSubDepartementItemsInSelect=async (departementID)=>{
    const res=await fetch(`http://localhost:4000/v1/tickets/departments-subs/${departementID}`)
    const subDepartement=await res.json();
    return subDepartement
}

const insertUserCoursesInSelect=async()=>{
    const res = await fetch('http://localhost:4000/v1/users/courses/',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    const userCourses=await res.json()
    .then(userCourses=>{
        userCourses.forEach(userCourse=>{
            userCoursesElem.insertAdjacentHTML('beforeend',
            `
            <option class="ticket-form__option" value=${userCourse._id}>${userCourse.course.name}</option>
            `
            )
        })
})
 }

submitBtn.addEventListener('click',  event=>{
    event.preventDefault();

if(departementID !== '-1' &&    priority!== '-1') {
    showSwal('Are you sure about sending this ticket?','warning',['No','Yes'],
    async (result)=>{
if(result){

    const newTicket = {
        departmentID:departementID ,
        departmentSubID:departmentSubID ,
        title:ticketTitleElem.value.trim(),
        priority: priority,
        body:ticketBodyElem.value.trim() ,
        course:userCoursesID ,
      }; 
console.log(newTicket);
  const res=await fetch('http://localhost:4000/v1/tickets',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(newTicket)

      })
     if(res.ok){
        showSwal('Your ticket has been successfully registered','success','OK',()=>{location.href="./../../my-account/Tickets/index.html"})
     }else{
        showSwal('There is a problem in registering the ticket','error','OK',()=>{})
     } 
   }

    })

}
else{
showSwal('The required items must be completed','error','OK',()=>{})
}
})


window.addEventListener('load',()=>{
    insetDepartementItemsInSelect();
    insertUserCoursesInSelect();
})
