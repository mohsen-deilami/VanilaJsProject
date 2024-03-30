import { getToken } from "../funcs/utils.js";
const token=getToken();
const tableBodyElem=document.querySelector('#table-body');

const getAllOrders=async ()=>{
    const res=await fetch('http://localhost:4000/v1/orders',{
        headers:
       {
        Authorization:`Bearer ${token}`
    }
    })
    const result =await res.json()
    return result
}

const showAllOrders=()=>{
  
    tableBodyElem.innerHTML='';
        getAllOrders().then(orders=>{
            if(orders.length !==0){}else{
                tableBodyElem.insertAdjacentHTML('beforeend',
                `
                <div className="alert alert-danger"> You are not enrolled in any course </div>
                `
                ) 
            }
orders.map((order , index) =>(
    tableBodyElem.insertAdjacentHTML('beforeend',
    `
    <tr class="order__table-body-list">
    <th class="order__table-body-item">
        <a href="#" class="order__table-body-link">${index + 1}</a>
    </th>
    <th class="order__table-body-item">${order.createdAt.slice(0,10)} </th>
    <th class="order__table-body-item">${order.course.name} </th>
    <th class="order__table-body-item">${order.course.status === 1 ? 'Completed ' : 'On performing' } </th>
    <th class="order__table-body-item">${order.price.toLocaleString()} </th>
    <th class="order__table-body-item">
        <a class="order__table-body-btn" href="./../../my-account/Orders/orderDetails.html?orderID=${order._id}">View Details</a>
    </th>
</tr>
    `
    )
))
      
        console.log(orders);
    })
}


window.addEventListener('load',()=>{
    showAllOrders();
})