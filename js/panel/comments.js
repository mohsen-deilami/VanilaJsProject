import { getToken, showSwal } from "../funcs/utils.js";

const token = getToken();
const getAllComments = async () => {
    const res = await fetch("http://localhost:4000/v1/comments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = res.json();
    return result;
  };

  const showComments = () => {
    const commentListElem = document.querySelector("#list-comments");
    commentListElem.innerHTML='';
    getAllComments().then((commetns) => {
      console.log(commetns);
      commetns.forEach((commetn, index) => {
        commentListElem.insertAdjacentHTML(
          "beforeend",
  
          `
             <tr>
             <td>${index + 1}</td>
             <td>${commetn.course}</td>
             <td>${commetn.creator ? commetn.creator.name : '--' }</td>
            
            
             <td>
                 <button type='button' class='btn btn-primary edit-btn' onclick="viewComment('${commetn.body}')">View</button>
             </td>
             <td>
             ${commetn.answer === 0 ? 
                 `<button type='button' class='btn btn-primary edit-btn' onclick="acceptComment('${commetn._id}')">Accept</button> `
                 :
                `
                 <button type='button' class='btn btn-danger edit-btn' onclick="rejectComment('${commetn._id}')">Reject</button>
                 `
                }
             </td>
             <td>

                 <button type='button' class=' ${commetn.answer === 0 ? 

                  'btn btn-primary delete-btn' 
                  :
                  'btn btn-success delete-btn'   
                } 
                 onclick="answerComment('${commetn._id}')">Ansewer</button>

             </td>
             <td>
                 <button type='button' class='btn btn-danger delete-btn' onclick="removeComment('${commetn._id}')">Delete</button>
             </td>
             </tr>
      `
        );
      });
    });
  };
  const viewComment=commentBody=>{
   showSwal(commentBody , '' , 'Saw' , ()=>{})
  }

  const removeComment = (commentID) => {
    swal({
      title: "Are you sure for delete this comment ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "The comment deleted successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              showComments();
            });
          } else {
            swal({
              title: "There was a problem deleting the comment.",
              icon: "error",
              buttons: "Ok",
            });
          }
        });
      }
    });
  };

  const acceptComment=async commentID=>{
    swal({
      title: "Are you sure for accept this comment ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "The comment accepted successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              showComments();
            });
          } else {
            swal({
              title: "There was a problem accepted the comment.",
              icon: "error",
              buttons: "Ok",
            });
          }
        });
      }else{

      }
    })
  }

  const rejectComment=async commentID=>{
    swal({
      title: "Are you sure for Reject this comment ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "The comment rejected successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              showComments();
            });
          } else {
            swal({
              title: "There was a problem rejected the comment.",
              icon: "error",
              buttons: "Ok",
            });
          }
        });
      }else{

      }
    })
  }

  const answerComment=async commentID=>{
    swal({
      title: "Please enter your answer?!",
      icon: "success",
      buttons: ['Cancel','Submit'],
      content:'input'
    }).then((answerBody) => {

    let answerCommentBody={
      body:answerBody
    }
  
     if (answerBody !==null) {
        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
          method: "POST",
          headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify(answerCommentBody)
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "The comment answered successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              showComments();
            });
          } else {
            swal({
              title: "There was a problem answer the comment.",
              icon: "error",
              buttons: "Ok",
            }).then(() => {
              showComments();
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

  window.answerComment=answerComment
  window.acceptComment=acceptComment
  window.rejectComment=rejectComment
window.removeComment=removeComment
  window.viewComment=viewComment
  
  window.addEventListener('load',()=>{
    showComments();
  })