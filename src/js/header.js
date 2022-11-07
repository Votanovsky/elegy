export async function loadHeader() {
    await fetch("html/includes/header.html")
    .then(response => response.text())
    .then(text => document.body.querySelector("header").innerHTML = text);

    const mobileMenu  = document.querySelectorAll('li.menu_li_lay');
    switch(document.title) {
        case "Home":
            for (let li of mobileMenu) {
                if (li.children[0].id === 'page-home')
                    li.classList.add('menu_li_lay-active');
            }
            break;
        case "About":
            for (let li of mobileMenu) {
                if (li.children[0].id === 'page-about')
                    li.classList.add('menu_li_lay-active');
            }
            break;
        case "Cases":
            for (let li of mobileMenu) {
                if (li.children[0].id === 'page-cases')
                    li.classList.add('menu_li_lay-active');
            }
            break;
        case "Work":
            for (let li of mobileMenu) {
                if (li.children[0].id === 'page-work')
                    li.classList.add('menu_li_lay-active');
            }
            break;
        default:
            break;
    }


    // const form_width = document.querySelector('.form_wr').getBoundingClientRect().width
    // const form_width2 = document.querySelector('.form_wr').offsetWidth

    
    
    // function doFckngWidthForMyStupidInput() {
    //     const message_input = document.querySelector('#message')

    //     // const newFormWidth = form_width.toString()
    //     const newFormWidth = Number(form_width)
    //     message_input.style.width = newFormWidth + 'px' 
    //     // message_input.style.width = `${form_width2}px`;
    //     // message_input.style.width = '100px';


    //     console.log( typeof newFormWidth);

    //     console.log(form_width2);

    //     console.log(message_input.getBoundingClientRect().width);
    // }doFckngWidthForMyStupidInput()

    
}
