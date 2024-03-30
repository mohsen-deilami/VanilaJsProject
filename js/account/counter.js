import { isLogin } from "../funcs/utils.js";
import { getMe } from "../funcs/auth.js";
const userProfileName=document.querySelector('.main__title-name');

const showUserNameInfos = () => {
    const isUserLogin = isLogin();
  
    if (isUserLogin) {
      const userInfos = getMe().then((user) => {
        userProfileName.innerHTML=user.name;
      });
    } else {
      navbarProfileBox.setAttribute("href", "login.html");
      navbarProfileBox.innerHTML =
        '<span class="main-header__profile-text"> Register / Login</span> ';
    }
  };
  window.addEventListener('load',()=>{

    showUserNameInfos();
  })