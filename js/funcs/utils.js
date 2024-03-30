const showSwal = (title, icon, buttons, callback) => {
  swal({
    title,
    icon,
    buttons,
  }).then((result) => callback(result));
};

const saveIntoLocalStorage = (key, value) => {
  return localStorage.setItem(key,JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
  
  const userInfos=JSON.parse(localStorage.getItem("user"));
  return userInfos ? userInfos.Token : null
};

const isLogin=()=>{
const userInfos=localStorage.getItem('user');
return userInfos ? true : false;
}
const getUrlParam=(key)=>{
  const urlParam=new URLSearchParams(location.search);
  return urlParam.get(key)
}

const searchInArray=( array , searchProperty , searchValue)=>{
 
  let searchResult = array.filter(item =>item[searchProperty].toLowerCase().includes(searchValue.toLowerCase()));

 return searchResult

}

const addParamToUrl=(param,value )=>{
  
 let url=new URL(location.href);
 let searchParams=url.searchParams
 searchParams.set(param,value);
 url.search=searchParams.toString()
location.href=url.toString();
}

const paginateItems=(array,itemsPerPage,paginateParentElm,currentPage)=>{
  let endIndex=itemsPerPage * currentPage;
  let startIndex=endIndex-itemsPerPage;
  let paginatedCount=Math.ceil(array.length / itemsPerPage);
  let paginatedItems=array.slice(startIndex,endIndex);
  for(let i=1 ; i<paginatedCount+1; i++ ){
    paginateParentElm.insertAdjacentHTML('beforeend' , 
    
    `
    ${Number(currentPage) === Number (i) ?(
      `<li class="pagination__item">
    
      <a  class="pagination__link pagination__link-active" onclick="addParamToUrl('page' , ${i}")>
         ${i}
      </a>
  </li>` 
):(
`<li class="pagination__item">
    
    <a  class="pagination__link " onclick="addParamToUrl('page' , ${i})">
       ${i}
    </a>
</li>`
)
}
    
    `
    )
  }
  return paginatedItems
}

export { showSwal,
   saveIntoLocalStorage,
   getFromLocalStorage,
   getToken , 
  isLogin,getUrlParam ,
  searchInArray , 
  paginateItems,
  addParamToUrl
};
