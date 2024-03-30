const swiper = new Swiper('.swiper-container', {
    speed: 800,
    loop: true,

    scrollbar: {
        el: '.swiper-scrollbar',
      },
 
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    }
})