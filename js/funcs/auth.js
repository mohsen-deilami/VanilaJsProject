import { showSwal, saveIntoLocalStorage, getToken } from "./utils.js";

const register = () => {
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

const login = () => {
  const userLogin = document.querySelector("#user-login");
  const passLogin = document.querySelector("#pass-login");

  const userData = {
    identifier: userLogin.value,
    password: passLogin.value,
  };

  fetch(`http://localhost:4000/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      } else {
        return res.json();
      }
    })
    .then((result) => {
      showSwal("Success Login...!", "success", "Enter Panel", (result) => {
        location.href = "index.html";
      });
      saveIntoLocalStorage("user", { Token: result.accessToken });
    })
    .catch((err) => {
      swal({
        title: "Eine solche benutzer gibt es nicht",
        icon: "error",
        buttons: "Try  Again",
      });
    });
};

const getMe = async () => {
  const token = getToken();
  if (!token) {
    return false;
  } 
    const res = await fetch(`http://localhost:4000/v1/auth/me`, {
      headers:{

        Authorization: `Bearer ${token}`,
      }
    })
    const data = await res.json()
    return data
    
  
};

export { register, login, getMe };
