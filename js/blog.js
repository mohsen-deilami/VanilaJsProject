import { showUserNameInNavbar,  renderTopbarMenus,  getAllMenues  ,getInfosIndex , breadcrumb} from "./funcs/sheared.js";
import { getUrlParam , getToken ,showSwal} from "./funcs/utils.js";
let articleName=getUrlParam('article-name');
const articleBodyElem=document.querySelector('#article-body');
const articleTitleElem=document.querySelector('.article__title');
const articleBannerElem=document.querySelector('.article__banner');
const articleCategoryElem=document.querySelector('#article-category');
const articleCreatorElem=document.querySelector('#article-creator');
const articleDateElem=document.querySelector('#articel-date');
const breadCrumbWrapper=document.querySelector('.breadcrumb__list');

const getAllArticles=async()=>{
    const res=await fetch(`http://localhost:4000/v1/articles/${articleName}`)
    const articles=await res.json()
    return articles
  }

  const showArticles=()=>{
    getAllArticles().then(article=>{
        articleTitleElem.innerHTML=article.title;
        articleBodyElem.innerHTML=article.body;
        articleBannerElem.src=`http://localhost:4000/courses/covers/${article.cover }`;
        articleCategoryElem.innerHTML=article.categoryID.title;
        articleCreatorElem.insertAdjacentHTML('beforeend' , `${article.creator.name}`);
        articleDateElem.insertAdjacentHTML('beforeend' , `${article.createdAt.slice(0,10)}`);  
        breadcrumb(breadCrumbWrapper,article)      
    })
  }
  

window.addEventListener('load' ,()=>{
    showUserNameInNavbar();
    renderTopbarMenus();
    getAllMenues();
     getInfosIndex();
     showArticles();
})