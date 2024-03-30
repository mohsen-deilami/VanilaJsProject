import { getToken, showSwal } from "../funcs/utils.js";
const selectParentElem = document.querySelector("#select-parent");
const submitBtn = document.querySelector(".submit-btn");
let parentID = undefined;

const getAllMenu = async () => {
     selectParentElem.innerHTML='';
  const res = await fetch("http://localhost:4000/v1/menus/all");
  const result = await res.json();
  return result;
};
const showMenu = () => {
  const listMenuElem = document.querySelector("#list-menu");

  getAllMenu().then((menues) => {
    listMenuElem.innerHTML = "";
  
    menues.forEach((menu, index) => {
        listMenuElem.insertAdjacentHTML(
        "beforeend",
        `
    <tr>
    <td>${index + 1} </td>
    <td>${menu.title} </td>
    <td><a href="#">${menu.href} </a></td>

    <td>${menu.parent ? menu.parent.title : "---"}   </td>
    <td>
        <button type='button' class='btn btn-primary edit-btn'>Edit</button>
    </td>
    <td>
        <button type='button' class='btn btn-danger delete-btn' onclick="removeMenu('${menu._id}')">Delete</button>
    </td>
</tr>

    `
      );
     

      selectParentElem.insertAdjacentHTML(
        "beforeend",
        `
    ${menu.parent ? "" : `<option value=${menu._id}>${menu.title}</option>`}
    
    `
      );
    });
  });
};

const removeMenu = (menuID) => {
  const token = getToken();
  swal({
    title: "Are you sure for delete this menu ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/menus/${menuID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
     
        if (res.ok) {
          swal({
            title: "The menu deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            showMenu();
          });
        } else {
          swal({
            title: "There was a problem deleting the menu.",
            icon: "error",
            buttons: "Ok",
          });
        }
      });
    }
  });
};

selectParentElem.addEventListener(
  "change",
  (event) => (parentID = event.target.value)
);

const createNewMenu = async () => {
  const token = getToken();
  const menuHrefElem = document.querySelector(".menu-title");
  const menuTitleElem = document.querySelector(".menu-href");

  const newMenuInfos = {
    title: menuTitleElem.value.trim(),
    href: menuHrefElem.value.trim(),
    parent: parentID,
  };
  const res = await fetch("http://localhost:4000/v1/menus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newMenuInfos),
  });
  if(res.ok){
    showSwal('The menu succefully created...' , 'success','Ok',()=>showMenu())
  }
};
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createNewMenu();
});
window.removeMenu = removeMenu;
window.addEventListener("load", () => {
  showMenu();
});
