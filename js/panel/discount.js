import { getToken, showSwal } from "../funcs/utils.js";
const token = getToken();
const createCampingElem=document.querySelector('#create-camping');
const codePercent=document.querySelector('#off-code');

createCampingElem.addEventListener('click',(event)=>{
    event.preventDefault();
    swal({
     title: "Are you sure the general discount applies?",
     icon: "warning",
     buttons: ['NO','YES']
    }).then(result => { 
  
           if(result){
            let newDiscountNumber={
              discount:codePercent.value.trim()
            }
              fetch(`http://localhost:4000/v1/offs/all`,{
                 method:'POST',
                 headers:{
                  'Content-Type':'application/json',
                     Authorization:`Bearer ${token}`
                 },
                 body:JSON.stringify(newDiscountNumber)
             }).then(res=>{
                 if (res.ok) {
                     showSwal(
                       "The Camping was successfully Created",
                       "success",
                       "OK  ",
                       () => { }
                     );
                   } 
                   else{
                      showSwal(
                          "There was a problem Create the Camping",
                          "warning",
                          "OK  ",
                          () => { }
                        );
                   }
                 
                 })
  
                 } 
  
      } 
    )
  
  })