import { showUserNameInNavbar ,renderTopbarMenus,submitNewsLetter} from "./funcs/sheared.js";
import { login } from "./funcs/auth.js";
const loginBtn=document.querySelector('#login-btn');

const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter()
})


window.addEventListener("load", () => {

    showUserNameInNavbar();
})
loginBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    login();
    showUserNameInNavbar();
    renderTopbarMenus();
})

