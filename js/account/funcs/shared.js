import { renderTopbarMenus, getAllMenues,showUserNameInNavbar} from "../../funcs/sheared.js";
import { showSwal } from "../../funcs/utils.js";

const topbarEmailElem = document.querySelector("#topbar-email");
const topbarPhoneElem = document.querySelector("#topbarPhone");
const footerElem=document.querySelector('.footer');

function getInfosIndex() {
  fetch("http://localhost:4000/v1/infos/index")
    .then((res) => res.json())
    .then((infos) => {
     
      topbarEmailElem.innerHTML = infos.email;
      topbarPhoneElem.innerHTML = infos.phone;
    });
}

const showSidebar = () => {
  const sidebarWrapper = document.querySelector("#sidebar");
  sidebarWrapper.insertAdjacentHTML(
    "beforeend",
    `
    <div class="sidebar">
        
        <ul class="sidebar__list">
            <li class="sidebar__item">
                <a class="sidebar__link" href="./../../../my-account/Account/index.html">Counter</a>
            </li>
            <li class="sidebar__item">
                <a class="sidebar__link" href="./../../../my-account/Orders/index.html">Orders</a>
            </li>
            <li class="sidebar__item">
                <a class="sidebar__link" href="#"> My wallet</a>
            </li>
            <li class="sidebar__item">
                <a class="sidebar__link" href="./../../../my-account/Edit/index.html">User account details</a>
            </li>
            <li class="sidebar__item">
                <a class="sidebar__link" href="./../../../my-account/Buyed/index.html">Courses purchased  </a>
            </li>
            <li class="sidebar__item">
                <a class="sidebar__link" href="./../../../my-account/Tickets/index.html"> Support tickets </a>
            </li>
            <li class="sidebar__item" id="logout-user">
                <a class="sidebar__link" onclick="logOut()" href="#"> Logout</a>
            </li>
        </ul>
    </div>


    `
  );
};
const logOut=()=>{
  showSwal('Are you sure for logout?','warning',['No','Yes'],(result)=>{
      if(result){
          localStorage.clear();
          location.href="./../../../index.html"
      }
  })
  }
  window.logOut=logOut

  const renderFooter=()=>{
    footerElem.insertAdjacentHTML('beforeend',
    `
    <div class="container">
    <div class="footer-widgets">
      <div class="row">
        <div class="col-4">
          <div class="footer-widget__item">
            <span class="footer-widget__title">About Us</span>
            <p class="footer-widgets__text">
              When I first started learning programming. One of the problems I had
              in the learning process was the lack of good training with
              acceptable support, which made me decide then that if one day I had
              acceptable financial and technical ability, I would start a website
              to solve this problem! And today Sabzlern programming training
              academy operates as a private academy and this means that every
              school is not allowed to teach in it and must pass the special
              filtering of Sabzlern academy! At Sabzleran Academy, we guarantee
              good and quality support. Because the instructors of the Sabzlern
              website even charge a fee to support their free courses and are
              committed to having the love of their dear users!
            </p>

          </div>
        </div>

        <div class="col-4">

          <div class="footer-widget__item">
            <span class="footer-widget__title">The latest content</span>
            <div class="footer-widgets__links">
              <a href="#" class="footer-widgets__link">
                How to install the library in Python Python library installation
                tutorial?
              </a>
              <a href="#" class="footer-widgets__link">
                How to update Python? | Tutorial on updating Python from zero to
                one hundred
              </a>
              <a href="#" class="footer-widgets__link">
                How to install Python on Mac, Windows and Linux Step by step and
                image
              </a>
              <a href="#" class="footer-widgets__link">
                The best front-end frameworks 16. Front-end frameworks check the
                disadvantages and benefits
              </a>
              <a href="#" class="footer-widgets__link">
                Introducing the best JavaScript training site [experience
                oriented] + free training
              </a>

            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="footer-widget__item">
            <span class="footer-widget__title">Quick Access</span>
            <div class="footer-widgets__links">
              <div class="row">
                <div class="col-6">
                  <a href="#" class="footer-widgets__link">
                    HTML tutorial
                  </a>
                </div>

                <div class="col-6">
                  <a href="#" class="footer-widgets__link">
                    CSS tutorial
                  </a>
                </div>

                <div class="col-6">
                  <a href="#" class="footer-widgets__link">
                    JavaScript training
                  </a>
                </div>
                <div class="col-6">
                  <a href="#" class="footer-widgets__link">
                    Bootstrap tutorial
                  </a>
                </div>
                <div class="col-6">
                  <a href="#" class="footer-widgets__link">
                    React training
                  </a>
                </div>

                <div class="col-6">
                  <a href="#" class="footer-widgets__link">
                    Python training
                  </a>
                </div>

                <div class="col-6">
                  <a href="/contact-us.html" class="footer-widgets__link"> Contact Us </a>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer__copyright">
    <span class="footer__copyright-text">
      All rights are reserved for Mr. Mohsen Deilami.
    </span>
  </div>
    `)
  }


window.addEventListener("load", () => {
  renderTopbarMenus();
  showUserNameInNavbar();
  getInfosIndex();
  getAllMenues();
  showSidebar();
  renderFooter();
});
