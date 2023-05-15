 'use strict';


let el = document.querySelectorAll(".main-menu-content .nav-item")
for (let i = 0; i < el.length; i++) {
  el[i].onclick = function () {
    var active = 0;
    while (active < el.length) {
      el[active++].className = 'item';
    }
    el[i].className = 'item active';
  };
}



// open menu
let main_menu = document.getElementById("main_menu")
let btnMenu = document.getElementById("btnMenu")
let btn_close = document.getElementById("btn_close")
let content = document.getElementById("content")

 


btnMenu.addEventListener("click", function () {
  main_menu.style.cssText =
    "visibility: visible ; transform: translateX(0%); z-index:9999;"
    content.style.cssText = "background-color:#00000066; z-index: 999;";
  })
 
 btn_close.addEventListener("click", function () {
  main_menu.style.cssText =
    "visibility: hidden ; transform: translateX(-100%); z-index:9999;"
      content.style.cssText = "background-color:unset; z-index: -1;";

  })
  content.addEventListener("click", function () {
    main_menu.style.cssText =
      "visibility: hidden ; transform: translateX(-100%); z-index:9999;"
        content.style.cssText = "background-color:unset; z-index: -1;";
  
    })
