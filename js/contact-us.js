import { showUserNameInNavbar,  renderTopbarMenus,  getAllMenues,submitNewsLetter,getInfosIndex} from "./funcs/sheared.js";
   import { showSwal } from "./funcs/utils.js";
 
const submitElem=document.querySelector('#submitBtn');

submitElem.addEventListener('click' , (event)=>{
    event.preventDefault();
    submitContactUsMsg();
})

  const submitContactUsMsg=async()=>{
  const nameInputElem=document.querySelector('#name');
const emailInputElem=document.querySelector('#email');
const phoneInputElem=document.querySelector('#phone');
const bodyInputElem=document.querySelector('#body');

const newContactUsInfos={
 name:nameInputElem.value,
email:emailInputElem.value,
phone:phoneInputElem.value,
body:bodyInputElem.value
}

 const res=await fetch(`http://localhost:4000/v1/contact`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(newContactUsInfos)
  })
  const  result =await res.json()
 if(res.ok){
    showSwal(
        "Your message has been registered successfully",
        "success",
        "Ok  ",
        (result) => {
            nameInputElem.value='';
            emailInputElem.value='';
            phoneInputElem.value='';
            bodyInputElem.value='';
        }
      )
 }
 else{
    showSwal(
        "There is a problem in sending the message,\n please test later",
        "error",
        "Ok  ",
        (result) => {
            nameInputElem.value='';
            emailInputElem.value='';
            phoneInputElem.value='';
            bodyInputElem.value='';
        }
      )
 }
}
const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter()
})
window.addEventListener('load',()=>{
  showUserNameInNavbar();
  renderTopbarMenus();
  getAllMenues();
  getInfosIndex();
})
