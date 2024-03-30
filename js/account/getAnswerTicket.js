import { getUrlParam, getToken, showSwal } from "../funcs/utils.js";

let ticketID = getUrlParam("id");
const token = getToken();
const ticketIdElem=document.querySelector('#ticket-id');
const ticketBodyElem=document.querySelector('#ticket-body');
const responseBodyElem=document.querySelector('#response-body');
console.log(ticketID);
const getAnswer = async () => {
  const res = await fetch(
    `http://localhost:4000/v1/tickets/answer/${ticketID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await res.json();
  return tickets;
};

const showTciket = () => {
    ticketIdElem.innerHTML=ticketID;
  getAnswer().then((ticket) => {

    ticketBodyElem.innerHTML=ticket.ticket;
    responseBodyElem.innerHTML=ticket.answer === null ? 'Your ticket has not been answered yet' : ticket.answer ;
  });
};


window.addEventListener('load',()=>{
    showTciket();
})
