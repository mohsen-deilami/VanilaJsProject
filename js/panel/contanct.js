import { getToken, showSwal } from "../funcs/utils.js";
const token = getToken();
const submitBtn = document.querySelector(".submit-btn");

const getAllContact = async () => {
  const res = await fetch("http://localhost:4000/v1/contact", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = res.json();

  return result;
};

const showAllContact = () => {
  const listContactElem = document.querySelector("#list-contact");

  getAllContact().then((contacts) => {
    listContactElem.innerHTML = "";

    contacts.forEach((contact, index) => {
      listContactElem.insertAdjacentHTML(
        "beforeend",
        `
      <tr>
      <td>${index + 1} </td>
      <td>${contact.name} </td>
      <td>${contact.email} </td>
      <td>${contact.createdAt.slice(0, 10)} </td>
      <td>  <button type='button' class='btn btn-primary edit-btn' onclick="viewContact('${contact.body}')">View</button></td>

       ${contact.answer === 0 ? 
            `<td>  <button type='button' class='btn btn-primary edit-btn'onclick="answerContact('${contact.email}')">Answer</button>  </td>`
           : 
            `<td>  <button type='button' class='btn btn-success edit-btn'onclick="answerContact('${contact.email}')">Answer</button>  </td>`
            }
      
      <td>
          <button type='button' class='btn btn-danger delete-btn' onclick="removeContact('${contact._id}')">Delete</button>
      </td>
  </tr>
  
      `
      );
    });
  });
};

const removeContact = (contactID) => {
  swal({
    title: "Are you sure for delete this user ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/contact/${contactID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "The contact deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            showAllContact();
          });
        } else {
          swal({
            title: "There was a problem deleting the contact.",
            icon: "error",
            buttons: "Ok",
          });
        }
      });
    }
  });
};

const viewContact = (contactBody) => {
  showSwal(contactBody, undefined, "I saw", () => {});
};

const answerContact = (userEmail) => {
  swal({
    title: "Enter your answer",
    icon: undefined,
    buttons: "Send",
    content: "input",
  })
  .then((answerBody) => {
if(answerBody){
  const contactAnswerInfos = {
    email: userEmail,
    answer: answerBody,
  };

  const res = fetch("http://localhost:4000/v1/contact/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contactAnswerInfos),
  }).then((res) => {
    if (res.ok) {
      swal({
        title: "The answer successfully send for user  ",
        icon: "success",
        buttons: "Ok",
      }).then(() => showAllContact() );

    } else {
      swal({
        title: "There was a problem to the send message.",
        icon: "error",
        buttons: "Ok",
      });
    }
  });
}
else{
  swal({
    title: "Enter your answer for this comment",
    icon: "error",
    buttons: "Ok",
  });
}


  });
};

window.answerContact = answerContact;
window.removeContact = removeContact;
window.viewContact = viewContact;
window.addEventListener("load", () => {
  showAllContact();
});
