import { showUserNameInNavbar ,renderTopbarMenus,submitNewsLetter} from "./funcs/sheared.js";
import { register } from "./funcs/auth.js";


const registerBtn = document.querySelector("#register-btn");
const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter()
})

registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
  register();
  showUserNameInNavbar();
  renderTopbarMenus();
  
});
