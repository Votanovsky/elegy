export async function loadHeader(){await fetch("html/includes/header.html").then((e=>e.text())).then((e=>document.body.querySelector("header").innerHTML=e));const e=document.querySelectorAll("li.menu_li_lay");switch(document.title){case"Elegy Studio":for(let a of e)"page-home"===a.children[0].id&&a.classList.add("menu_li_lay-active");break;case"About Elegy":for(let a of e)"page-about"===a.children[0].id&&a.classList.add("menu_li_lay-active");break;case"Our cases":for(let a of e)"page-cases"===a.children[0].id&&a.classList.add("menu_li_lay-active");break;case"How we work":for(let a of e)"page-work"===a.children[0].id&&a.classList.add("menu_li_lay-active")}}