import { getToken } from "./utils.js";
const notificationModalList=document.querySelector('.home-notification-modal-list');
const insertNotificationsHtmlTemplate=notifications=>{
    if(notifications.length){
        notifications.forEach(notification =>{
            notificationModalList.insertAdjacentHTML('beforeend',
            `
            <li class="home-notification-modal-item">
            <a href="#" onclick='seenNotification(${JSON.stringify(notifications)},${JSON.stringify(notification._id)})'>
           saw
            </a>
            <span class="home-notification-modal-text">${notification.msg} </span>
        </li>
            `)
        })
    }
    else{
        notificationModalList.insertAdjacentHTML('beforeend',
        `
       <li class="alert alert-danger text-center">There are no notifications</li>
  
        `)
    }
}

const seenNotification=async(notifications,notificationId)=>{
   const token = getToken();
const res=await fetch(`http://localhost:4000/v1/notifications/see/${notificationId}`,{
    method:'PUT',
    headers:{

        Authorization: `Bearer ${token}`,
    }
}) 


const resul=res.json()
removeNotification(notifications,notificationId);

}
const removeNotification=(notifications,notificationId)=>{
    notificationModalList.innerHTML='';
     const filteredNotifications=notifications.filter(item=>item._id !== notificationId);
     insertNotificationsHtmlTemplate(filteredNotifications);
}

export {insertNotificationsHtmlTemplate , seenNotification}