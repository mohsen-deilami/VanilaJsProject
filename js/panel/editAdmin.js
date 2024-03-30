import { getAdminInfos } from "./utils.js";
import { getToken, showSwal } from "../funcs/utils.js";
const token = getToken();

const nameElem = document.querySelector("#name");
const usernameElem = document.querySelector("#username");
const emailElem = document.querySelector("#email");
const phoneElem = document.querySelector("#phone");
const passwordElem = document.querySelector("#password");
const submitElem=document.querySelector('#submit');

const editAdminInfos = async () => {
  if(  nameElem.value && usernameElem.value && emailElem.value &&  passwordElem.value && phoneElem.value){

  
  const newAdminInfos = {
    name:  nameElem.value,
    username: usernameElem.value ,
    email: emailElem.value,
    password: passwordElem.value ,
    phone: phoneElem.value
  };
  swal({
    title: "Are you sure for change infos this user ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      const res =  fetch("http://localhost:4000/v1/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(newAdminInfos)
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "The user's infos successfully changed ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            showInfos();
          });
        } else {
          swal({
            title: "There was a problem changed infos the user.",
            icon: "error",
            buttons: "Ok",
          });
        }
      });;
    }})
  }else{
    swal({
      title: "You must fill in all fields ",
      icon: "warning",
      buttons: "Ok",
     
    })
  }
};
submitElem.addEventListener('click',event=>{
    event.preventDefault();
    editAdminInfos();
 
})
const showInfos=()=>{
  getAdminInfos().then((info) => {
    console.log(info);
    nameElem.value = info.name;
    usernameElem.value = info.username;
    emailElem.value = info.email;
    phoneElem.value = info.phone;
  });
}
window.addEventListener("load", () => {
  showInfos()
});
