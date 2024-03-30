import { getToken, showSwal } from "../funcs/utils.js";

const token = getToken();
const getAllTickets = async () => {
    const res = await fetch("http://localhost:4000/v1/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = res.json();
    return result;
  };

  const viewTicketBody=ticketBody=>{
    showSwal(ticketBody,'','OK',()=>{})
  }

  const showAllTickets = () => {
    const tickettListElem = document.querySelector("#list-ticket");
    tickettListElem.innerHTML='';
    getAllTickets().then((tickets) => {
      console.log(tickets);
      tickets.forEach((ticket, index) => {
        tickettListElem.insertAdjacentHTML(
          "beforeend",
          `
             <tr>
             <td>${index + 1}</td>
             <td>${ticket.title}</td>
             <td>${ticket.user ? ticket.user.username : '--' }</td>
             <td>${ticket.course }</td>
             <td>${ticket.departmentID }</td>
             <td>${ticket.createdAt.slice(0,10)}</td>
            
             <td>
                 <button type='button' class= 'btn btn-primary edit-btn' onclick="viewTicketBody('${ticket.body}')">View</button>
             </td>
             <td>
             ${ticket.answer === 0 ? 
                ` <button type='button' class='btn btn-primary edit-btn' onclick="answerTicket('${ticket._id}')">Answer</button>`
                :
                ` <button type='button' class='btn btn-success edit-btn' onclick="answerTicket('${ticket._id}')">Answer</button>`
             }
             </td>
            
             <td>
                 <button type='button' class='btn btn-danger delete-btn' onclick="removeComment('${ticket._id}')">Delete</button>
             </td>
             </tr>
      `
        ); 
      });
    });
  };
  const answerTicket=async ticketID=>{
    swal({
      title: "Please enter your answer?!",
      icon: "success",
      buttons: ['Cancel','Submit'],
      content:'input'
    }).then((answerBody) => {

    let answerTicketBody={
      ticketID:ticketID,
      body:answerBody
    }
     if (answerBody !==null) {
        fetch(`http://localhost:4000/v1/tickets/answer/`, {
          method: "POST",
          headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify(answerTicketBody)
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "The ticket answered successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              showAllTickets();
            });
          } else {
            swal({
              title: "There was a problem answer the comment.",
              icon: "error",
              buttons: "Ok",
            }).then(() => {
              showAllTickets();
            });
          }
        });
      }else{
        swal({
          title: "Text must be sent to send a reply",
          icon: "error",
          buttons: "Ok",
        })
      }
    })
  }
  window.answerTicket=answerTicket
window.viewTicketBody=viewTicketBody;
  window.addEventListener('load',()=>{
    showAllTickets();
  })