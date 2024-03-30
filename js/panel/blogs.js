import { getToken, showSwal } from "../funcs/utils.js";

const token = getToken();
let articleBodyEditor = null;
let categoryId = "-1";
let articleImg = null;
const imgSelected = document.querySelector("#file");
const selectCategory = document.querySelector("#selectCategory");
const publichArticleElem = document.querySelector("#publich-article");
const drafthArticleElem = document.querySelector("#draft-article");
const titleElem=document.querySelector('#title');
const descriptionElem=document.querySelector('#description');
const shortNameElem=document.querySelector('#shortName');


const getAllcategory = async () => {
  const res = await fetch("http://localhost:4000/v1/category");
  const result = res.json();
  return result;
};

const getAllArticles = async () => {
  const res = await fetch("http://localhost:4000/v1/articles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = res.json();
  return result;
};

const showArticles = () => {
  const articleListElem = document.querySelector("#list-article");
  articleListElem.innerHTML = "";
  getAllArticles().then((articles) => {
    console.log(articles);
    articles.forEach((article, index) => {
      articleListElem.insertAdjacentHTML(
        "beforeend",

        `
             <tr>
             <td>${index + 1}</td>
             <td>${article.title}</td>
             <td>${article.creator ? article.creator.name : ""}</td>
             <td>${article.updatedAt.slice(0, 10)}</td>
             <td>${article.publish === 1 ? "Published" : "Draft"}</td>
             
           
             <td>  <button type='button' class='btn btn-primary edit-btn' onclick="vewArticle('${article.body}')">Edit</button> </td>
             <td>  <button type='button' class='btn btn-danger delete-btn'onclick="removeArticle('${article._id}')" >Delete</button>  </td>
             </tr>
      `
      );
    });
  });
};

const insertCategoryInCategoryList = () => {
  getAllcategory().then((allCategory) => {
    allCategory.forEach((category) => {
      console.log(category);

      selectCategory.insertAdjacentHTML(
        "beforeend",
        `
        <option value="${category._id}">${category.title}</option>
        `
      );
    });
  });
};

const removeArticle = (articleID) => {
  swal({
    title: "Are you sure for delete this Article ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/articles/${articleID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "The Article deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            showArticles();
          });
        } else {
          swal({
            title: "There was a problem deleting the article.",
            icon: "error",
            buttons: "Ok",
          });
        }
      });
    }
  });
};

const createEditor = () => {
  ClassicEditor.create(document.querySelector("#editor"))
    .then((editor) => {
      articleBodyEditor = editor;
    })
    .then((error) => console.log(error));
};

imgSelected.addEventListener("change",(event) => (articleImg = event.target.files[0]));

selectCategory.addEventListener("change",(event) => (categoryId = event.target.value));

const publishArticle=()=>{
  let formData=new FormData();
  formData.append('title', titleElem.value.trim());
formData.append('description',descriptionElem.value.trim());
formData.append('shortName',shortNameElem.value.trim());
formData.append('categoryID',categoryId);
formData.append('cover',articleImg);
formData.append('body',articleBodyEditor.getData() );


if(categoryId === '-1'){
  showSwal('Please select one category','warning','Ok',()=>{showArticles()})
}else {

fetch('http://localhost:4000/v1/articles',{
  method:'POST',
  headers:{
          "Authorization":`Beare ${token}`
      },
      body:formData
  }).then((res)=>{
      if(res.ok){

          showSwal('this Article successfully pblished','info','ok',()=>{showArticles()})
      }else{
         showSwal('there is one error','warning','ok',()=>{})

      }
  })

  } 
}
const draftArticle=()=>{
  let formData=new FormData();
  formData.append('title', titleElem.value.trim());
formData.append('description',descriptionElem.value.trim());
formData.append('shortName',shortNameElem.value.trim());
formData.append('categoryID',categoryId);
formData.append('cover',articleImg);
formData.append('body',articleBodyEditor.getData() );


if(categoryId === '-1'){
  showSwal('Please select one category','warning','Ok',()=>{showArticles()})
}else {

fetch('http://localhost:4000/v1/articles/draft',{
  method:'POST',
  headers:{
          "Authorization":`Beare ${token}`
      },
      body:formData
  }).then((res)=>{
      if(res.ok){

          showSwal('this Article successfully draft','info','ok',()=>{showArticles()})
      }else{
         showSwal('there is one error','warning','ok',()=>{})

      }
  })

  } 
}
publichArticleElem.addEventListener("click", (event) => {
  event.preventDefault();
  publishArticle();

});

drafthArticleElem.addEventListener("click", (event) => {
  event.preventDefault();
  draftArticle();

});

const vewArticle=bodyyy=>{
  console.log(bodyyy);
}
window.vewArticle=vewArticle
window.removeArticle = removeArticle;
window.addEventListener("load", () => {
  showArticles();
  insertCategoryInCategoryList();
  createEditor();
});
