import {
    showUserNameInNavbar,
    renderTopbarMenus,
    getAllMenues,
    submitNewsLetter, 
    getInfosIndex
 
  } from "./funcs/sheared.js";
  import { getUrlParam , getToken} from "./funcs/utils.js";

  window.addEventListener('load',()=>{
    showUserNameInNavbar();
    renderTopbarMenus();
    getAllMenues();
    getAndShowEpisode();
    showEpisode();
    showTopicsList();
    getInfosIndex();
  })

  const courseShortName=getUrlParam('name');
  const sessionId=getUrlParam('id');

  const episodeHeaderText=document.querySelector('.episode-header__left-text');
  const episodeContentVideo=document.querySelector('.episode-content__video');
  const topicsList=document.querySelector('.sidebar-topics__list');

  const getAndShowEpisode=async ()=>{
    const res=await fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionId}`,{
        headers:{
            Authorization :`Bearer ${getToken()}`
        }
    })
    const result =await res.json()

    return result
    
}

const showEpisode=()=>{
    getAndShowEpisode().then(sessionData=>{
        episodeHeaderText.innerHTML=sessionData.session.title;
        episodeContentVideo.setAttribute('src' ,`/video/${sessionData.session.video}`)
       
    })   
        

  }
  const showTopicsList=()=>{
    getAndShowEpisode().then(responseData =>(
        
        responseData.sessions.map(session =>(
           
            topicsList.insertAdjacentHTML('beforeend',
            `
            <li class="sidebar-topics__list-item">
                    <div class="sidebar-topics__list-right">
                      <i class="sidebar-topics__list-item-icon fa fa-play-circle"  ></i>
                      ${session.free === 1 ? 
                        `
                        <a href="episode.html?name=${courseShortName}&id=${session._id}" class="sidebar-topic__list-item-link" > ${session.title}</a>
                     ` :
                      `
                      <span  class="sidebar-topic__list-item-link" > ${session.title}</span>
                     
                     `}
                    
                     </div>
                    <div class="sidebar-topics__list-left">
                      <span class="sidebar-topics__list-item-time">${session.time}</span>
                    </div>
                  </li>
                
            `
            ) 
        )) 
    ))
  }
  const newsletterBtn=document.querySelector('.newsletter__btn');
newsletterBtn.addEventListener('click',()=>{
  submitNewsLetter()
})
