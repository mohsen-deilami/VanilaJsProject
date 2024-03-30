import { getToken } from "../funcs/utils.js";
const token=getToken();
const ticketsListElem=document.querySelector('.ticket-content');
const ticketTitleElem=document.querySelector('.ticket-content__title');

const allTicketBoxElem=document.querySelector('#all-ticket-box');
const closedTicketBoxElem=document.querySelector('#closed-ticket-box');
const answeredTicketBoxElem=document.querySelector('#answered-ticket-box');
const completedTicketBoxElem=document.querySelector('#completed-ticket-box');
const openTicketBox=document.querySelector('#open-ticket-box');

let answerTicketCount=0;
let closedTicketCount=0;
let completedTicketCount=0;
let openTicketCount=0;

const getAllTickets =async  () => {
 const res=await   fetch("http://localhost:4000/v1/tickets/user", {
      headers: {
      
        Authorization: `Bearer ${token}`,
      },
    })
    const tickets=await res.json();
    return tickets
  };

const showAllTickets=()=>{
  getAllTickets().then(tickets=>{

      allTicketBoxElem.innerHTML=tickets.length;
      if(tickets.length !==0){
        ticketTitleElem.innerHTML= `View ${tickets.length} Ticket`;
        tickets.forEach(ticket => {

          ticketsListElem.insertAdjacentHTML('beforeend',
          `
          <div class="ticket-content__box">
          <div class="ticket-content__right">
              <div class="ticket-content__right-right">
                  <a class="ticket-content__link"
                   href="./../../my-account/Ansewr-Ticket/index.html?id=${ticket._id}"> ${ticket.title} </a>
                  <span class="ticket-content__category">
                      <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                       ${ticket.departmentSubID}</span>
              </div>
              <div class="ticket-content__right-left">
                  <span class="ticket-content__name"> ${ticket.user}</span>
              </div>
          </div>
          <div class="ticket-content__left">
              <div class="ticket-content__left-right">
                  <div class="ticket-content__condition">
                      <span class="ticket-content__condition-text">${ticket.answer === 1 ? 'Answered' : 'Dont Answered '}  </span>
                  </div>
              </div>
              <div class="ticket-content__left-left">
                  <span class="ticket-content__time">${ticket.createdAt.slice(0,10)}</span>
               
              </div>
          </div>
      </div>
          `)

          
          if(ticket.answer === 1){ answerTicketCount ++;}else{openTicketCount ++ ;}

          if(ticket.isAnswer === 1){
            closedTicketCount ++ ;
            completedTicketCount ++ ;
          }
        });

           closedTicketBoxElem.innerHTML=closedTicketCount;
           answeredTicketBoxElem.innerHTML=answerTicketCount;
           completedTicketBoxElem.innerHTML=completedTicketCount;
           openTicketBox.innerHTML=openTicketCount;


      }else{
        ticketsListElem.insertAdjacentHTML('beforeend',
        `       
        <div class="alert alert-danger">There is no ticket for you...</div>
        `)
        ticketTitleElem.innerHTML= 'View 0 Ticket';
      }
   
    })
}

window.addEventListener('load',()=>{
    showAllTickets();
})