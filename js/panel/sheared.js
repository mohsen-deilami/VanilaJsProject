import { getAdminInfos } from "./utils.js";
import { insertNotificationsHtmlTemplate,seenNotification } from "./../funcs/notifications.js";
import { showSwal } from "../funcs/utils.js";

window.seenNotification=seenNotification;

window.addEventListener('load',()=>{
    const adminNameElm=document.querySelector('#admin-name');
    const profileImgElm=document.querySelector('.profile__img');
    const notificationIconElm=document.querySelector('#notification-icon');
    const notificationModalBox=document.querySelector('.home-notification-modal');
    

    getAdminInfos().then(adminInfos=>{
        showSidebar();

      if (adminInfos.role === 'ADMIN') {
          adminNameElm.innerHTML=adminInfos.name;
          adminNameElm.setAttribute('href','./../../panel/EditAdmin/index.html')
            profileImgElm.src=adminInfos.profile;
      }
            else{
                location.replace('/index.html') 

            };

            notificationIconElm.addEventListener('mouseenter',()=>{
                notificationModalBox.classList.add('active-modal-notfication');
         
            })
            notificationModalBox.addEventListener('mouseleave',()=>{
                notificationModalBox.classList.remove('active-modal-notfication');
            })
            
            insertNotificationsHtmlTemplate(adminInfos.notifications);
        })
});


const showSidebar=()=>{
    const sidebarWrapper=document.querySelector('#sidebar');
    sidebarWrapper.insertAdjacentHTML('beforeend',
    `
    <div class="sidebar-header">
              
    <div class="sidebar-logo">
    <a href="/index.html"><img src="./../images/manida-logo.JPG" alt="Logo"></a>
</div>        
    <div class="sidebar-menu-btn">
        <i class="fas fa-bars"></i>
    </div>
  
</div>
<div class="sidebar-menu">
    <ul>
        <li class="active-menu"><a href="/panel/main/index.html"><span>Home </span></a></li>
        <li><a href="/panel/D-Products/index.html"><span>Courses </span></a></li>
        <li><a href="/panel/D-Menus/index.html"><span>Menu </span></a></li>
        <li><a href="/panel/D-Blogs/index.html"><span>Articles </span></a></li>
        <li><a href="/panel/Sessions/index.html"><span>Sessions  </span></a></li>
        <li><a href="/panel/D-Users/index.html"><span>Users</span></a></li>
        <li><a href="/panel/Categories/index.html"><span>Category </span></a></li>
        <li><a href="/panel/D-Comments/index.html"><span>Comments </span></a></li>
        <li><a href="/panel/D-Contact/index.html"><span>Message </span></a></li>
        <li><a href="/panel/D-Offs/index.html"><span>Offs </span></a></li>
        <li><a href="/panel/D-Tickets/index.html"><span>Tickets </span></a></li>
        <li><a href="/panel/D-Discount/index.html"><span>Camping </span></a></li>
        <li ><a href="#" onclick="logOut()"><span> Log Out </span></a></li>
    </ul>
</div>
    `
    )
};

const logOut=()=>{

showSwal('Are you sure for logout?','warning',['No','Yes'],(result)=>{
    if(result){
        localStorage.clear();
        location.href="./../../index.html"
    }
})
}
window.logOut=logOut