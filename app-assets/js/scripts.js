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
// multiCheck data table
function multiCheck(tb_var) {
  tb_var.on("change", ".chk-parent", function() {
      var e=$(this).closest("table").find("td:first-child .child-chk"), a=$(this).is(":checked");
      $(e).each(function() {
          a?($(this).prop("checked", !0), $(this).closest("tr").addClass("active")): ($(this).prop("checked", !1), $(this).closest("tr").removeClass("active"))
      })
  }),
  tb_var.on("change", "tbody tr .new-control", function() {
      $(this).parents("tr").toggleClass("active")
  })
}
// data table
$(document).ready(function () {
  $('#example').DataTable();
});


// open menu
let main_menu = document.getElementById("main_menu")
let btnMenu = document.getElementById("btnMenu")
let btn_close = document.getElementById("btn_close")
btnMenu.addEventListener("click", function () {
  main_menu.style.cssText =
    "visibility: visible ; transform: translateX(0%); z-index:9999;"
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  })
 document.addEventListener("blur" , function(){

    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
 })
 btn_close.addEventListener("click", function () {
  main_menu.style.cssText =
    "visibility: hidden ; transform: translateX(-100%); z-index:9999;"
    document.body.style.backgroundColor = "#f8f8f8";
  })