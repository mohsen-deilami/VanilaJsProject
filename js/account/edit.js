import { showSwal, getToken } from "../funcs/utils.js";
import { getMe } from "../funcs/auth.js";

const nameElem = document.querySelector("#name");
const usernameElem = document.querySelector("#username");
const emailElem = document.querySelector("#email");
const phoneElem = document.querySelector("#phone");
const passwordElem = document.querySelector("#password");
const repeatElem = document.querySelector("#repeat-password");
const sumbitBtn = document.querySelector(".edit__btn");
const token = getToken();

sumbitBtn.addEventListener("click", () => {
  const updatedInfos = {
    name: nameElem.value,
    username: usernameElem.value,
    email: emailElem.value,
    password: repeatElem.value,
    phone: phoneElem.value,
  };
  if (passwordElem.value === repeatElem.value) {
    showSwal(
      "Do you want to change the information?",
      "warning",
      ["No", "Yes"],
      (result) => {
        if (result) {
          fetch("http://localhost:4000/v1/users", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedInfos),
          }).then((res) => {
            res.json();
            if (res.ok) {
              showSwal(
                "Information changed successfully",
                "success",
                "Ok",
                () => {
                  location.reload();
                }
              );
            } else {
              showSwal(
                "There was a problem changing your information",
                "danger",
                "Ok",
                () => {}
              );
            }
          });
        }
      }
    );
  } else {
    showSwal(
      "The entered password does not match its repetition?",
      "danger",
      "Ok",
      () => {}
    );
  }
});

window.addEventListener("load", () => {
  getMe().then((infos) => {
    nameElem.value = infos.name;
    usernameElem.value = infos.username;
    emailElem.value = infos.email;
    phoneElem.value = infos.phone;
  });
});
