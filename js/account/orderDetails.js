import { getToken } from "../funcs/utils.js";
const token=getToken();
const urlParams=new URLSearchParams(location.search);
const orderId=urlParams.get('orderID');
const orderDetails=document.querySelector('.order__details');

const orderDetailIdElem=document.querySelector('.order__detail-id');
const orderDetailDateElem=document.querySelector('.order__detail-date');
const orderDetailStatusElem=document.querySelector('.order__detail-status');
const courseNameElem=document.querySelector('.course__name');
const coursePriceElem=document.querySelector('.course__price');
const orderDetailFooterTitleElem=document.querySelector('.order__detail-footer__title');

const getOrderInfos=async ()=>{
    const res=await fetch(`http://localhost:4000/v1/orders/${orderId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    const result=await res.json();
        return result
  
}
const showOrderDetailas=()=>{
    getOrderInfos().then(order=>{
        console.log(order[0]);
    orderDetailIdElem.innerHTML=order[0]._id;
    orderDetailDateElem.innerHTML=order[0].createdAt.slice(0,10);
    orderDetailStatusElem.innerHTML=order[0].course.status === 1 ? 'Completed ' : 'On performing';
courseNameElem.innerHTML=order[0].course.name;
coursePriceElem.innerHTML=`${order[0].course.price.toLocaleString()} $`;

    })
}
window.addEventListener('load',()=>{
    showOrderDetailas();
 console.log(orderId);
})