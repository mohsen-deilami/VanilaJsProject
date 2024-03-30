import { getToken, showSwal,saveIntoLocalStorage } from "../funcs/utils.js";
const createUserElem=document.querySelector('#create-user');
const token = getToken();

const getAllUsesrs = async () => {
  const res = await fetch("http://localhost:4000/v1/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = res.json();
  return result;
};

const showUsers = () => {
  const userListElem = document.querySelector("#list-users");
  userListElem.innerHTML='';
  getAllUsesrs().then((users) => {
    console.log(users);
    users.forEach((user, index) => {
      userListElem.insertAdjacentHTML(
        "beforeend",
        `
           <tr>
           <td>${index + 1}</td>
           <td>${user.username}</td>
           <td>${user.phone}</td>
           <td>${user.role}</td>
           <td>${user.email}</td>
           <td>
               <button type='button' class='btn btn-danger edit-btn' onclick="banUser('${user._id}')">Ban</button>
           </td>
           <td>
               <button type='button' class='${user.role === 'ADMIN' ? 'btn btn-success edit-btn' : 'btn btn-primary edit-btn '}'
               onclick="editUser('${user._id}', '${user.role}')">Change Role</button>
           </td>
           <td>
               <button type='button' class='btn btn-danger delete-btn'onclick="removeUser('${user._id}')" >Delete</button>
           </td>
           </tr>
    `
      );
    });
  });
};

const removeUser = (menuID) => {
  swal({
    title: "Are you sure for delete this user ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/users/${menuID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "The user deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            showUsers();
          });
        } else {
          swal({
            title: "There was a problem deleting the user.",
            icon: "error",
            buttons: "Ok",
          });
        }
      });
    }
  });
};

const banUser = (userId) => {
  swal({
    title: "Are you sure for ban this user ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "The user deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            showUsers();
          });
        } else {
          swal({
            title: "There was a problem deleting the user.",
            icon: "error",
            buttons: "Ok",
          });
        }
      });
    }
  });
};

createUserElem.addEventListener('click',event=>{
event.preventDefault();
createNewUser();
})

const createNewUser = () => {
    const nameInput = document.querySelector("#name");
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const passwordInput = document.querySelector("#password");
  
    const newUserInfos = {
      name: nameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      password: passwordInput.value.trim(),
      confirmPassword: passwordInput.value.trim(),
    };
  
    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((res) => {
        if (res.status === 201) {
          showSwal(
            "Registration was successful",
            "success",
            "Login to the panel  ",
            () => {
              location.href = "/index.html";
            }
          );
        } else if (res.status === 409) {
          showSwal(
            "username or email already used",
            "error",
            "correction of information",
            () => {}
          );
        }
        return res.json();
      })
      .then((result) =>
        saveIntoLocalStorage("user", { Token: result.accessToken })
      );
  };

const editUser = (userID,userRole) => {
  console.log(userID);
  console.log(userRole);
  let newRoleUser;
  if (userRole === "USER"){
     newRoleUser={
      "role":"ADMIN",
      "id": userID
    }
  }else{

  
   newRoleUser={
    "role":"USER",
    "id":userID
  }
}

   swal({
    title: "Are you sure for change role this user ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/users/role`, {
        method: "PUT",
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(newRoleUser)
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "The user role successfully changed ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            showUsers();
          });
        } else {
          swal({
            title: "There was a problem change role the user.",
            icon: "error",
            buttons: "Ok",
          });
        }
      });
    }
  }); 
}


window.removeUser = removeUser;
window.banUser = banUser;
window.editUser = editUser;

window.addEventListener("load", () => {
  showUsers();
});
