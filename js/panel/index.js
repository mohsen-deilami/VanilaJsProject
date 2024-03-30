import { getToken, showSwal,saveIntoLocalStorage } from "../funcs/utils.js";
const token = getToken();
const lastRegisterWrapper=document.querySelector('#last-register-wrapper');
const adminWelcomeName=document.querySelector('#admin-welcome-name');
const boxTitleLeft=document.querySelector('#box-title-left');
const getIndexInfos=async ()=>{
    const res=await fetch('http://localhost:4000/v1/infos/p-admin',{
        headers:{

            Authorization:`Bearer ${token}`
        }
    })
    const result=await res.json()
    console.log(result);
    adminWelcomeName.innerHTML=result.adminName
    boxTitleLeft.innerHTML=result.infos[0].title
    result.lastUsers.map((lastUser,index)=>{
        lastRegisterWrapper.insertAdjacentHTML('beforeend',
        `
                                  <tr>
                                        <th>${index+1}</th>
                                        <th>${lastUser.name}</th>
                                        <th>${lastUser.phone}</th>
                                        <th>${lastUser.email}</th>
                                        <th> ${lastUser.role}</th>
                                        <th>${lastUser.updatedAt.slice(0,10)} </th>
                                 </tr>
        `
        )

    })
}


window.addEventListener('load',()=>{
    getIndexInfos();
})