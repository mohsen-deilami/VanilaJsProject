import { getToken, showSwal } from "../funcs/utils.js";
const token = getToken();
const submitBtn = document.querySelector(".submit-btn");
const getAllCategory = async () => {
  const res = await fetch("http://localhost:4000/v1/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = res.json();

  return result;
};

const showCategory = () => {
    const listCategoryElem = document.querySelector("#list-category");
  
    getAllCategory().then((categories) => {
        listCategoryElem.innerHTML = "";
  
        categories.forEach((category, index) => {
            listCategoryElem.insertAdjacentHTML(
          "beforeend",
          `
      <tr>
      <td>${index + 1} </td>
      <td>${category.title} </td>
      <td>${category.name} </td>
    

      <td>
          <button type='button' class='btn btn-primary edit-btn'>Edit</button>
      </td>
      <td>
          <button type='button' class='btn btn-danger delete-btn' onclick="removeCategory('${category._id}')">Delete</button>
      </td>
  </tr>
  
      `
        );
     
      });
    });
  };

  const removeCategory = (categoryID) => {
    swal({
      title: "Are you sure for delete this user ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "The category deleted successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              showCategory();
            });
          } else {
            swal({
              title: "There was a problem deleting the category.",
              icon: "error",
              buttons: "Ok",
            });
          }
        });
      }
    });
  };

  const createNewCategory = async () => {
  
    const categoryNamefElem = document.querySelector(".category-name");
    const categoryTitleElem = document.querySelector(".category-title");
  
    const newCategoryInfos = {
      title: categoryNamefElem.value.trim(),
      name: categoryTitleElem.value.trim(),
  
    };
    const res = await fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCategoryInfos),
    });
    if(res.ok){
      showSwal('The category succefully created...' , 'success','Ok',()=>showCategory())
    }
  };

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createNewCategory();
  });
 

  window.removeCategory=removeCategory
  window.addEventListener("load", () => {
    showCategory();
  });
  