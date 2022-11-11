export async function loadHeader() {
    await fetch("html/includes/header.html")
    .then(response => response.text())
    .then(text => document.body.querySelector("header").innerHTML = text);

    const mobileMenu  = document.querySelectorAll('li.menu_li_lay');
    switch(document.title) {
        case "Elegy Studio":
            for (let li of mobileMenu) {
                if (li.children[0].id === 'page-home')
                    li.classList.add('menu_li_lay-active');
            }
            break;
        case "About Elegy":
            for (let li of mobileMenu) {
                if (li.children[0].id === 'page-about')
                    li.classList.add('menu_li_lay-active');
            }
            break;
        case "Our cases":
            for (let li of mobileMenu) {
                if (li.children[0].id === 'page-cases')
                    li.classList.add('menu_li_lay-active');
            }
            break;
        case "How we work":
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

export function validateForm() {
    const   form        = document.querySelector('form.form'), 
            messenger   = document.querySelector('#messenger'),
            nickname    = document.querySelector('#nickname'),
            email       = document.querySelector('#email'),
            phone       = document.querySelector('#phone'),
            message     = document.querySelector('#message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('prevent');
        if (!(messenger.value && nickname.value) && !email.value && !phone.value) {
            messenger.setCustomValidity(document.getElementById('contact_error').innerHTML);
        }
        else if (!message.value) {
            message.setCustomValidity(document.getElementById('message_error').innerHTML);
        }
        else {
            messenger.setCustomValidity("");
            message.setCustomValidity("");
            form.submit();
        }
    });

    messenger.addEventListener("input", () => {
        messenger.setCustomValidity("");
        // messenger.checkValidity();
    });

    nickname.addEventListener('input', () => {
        messenger.setCustomValidity("");
        // messenger.checkValidity();
    });

    email.addEventListener('input', () => {
        messenger.setCustomValidity("");
        // messenger.checkValidity();
    });

    phone.addEventListener('input', () => {
        messenger.setCustomValidity("");
        // messenger.checkValidity();
    });
    
    message.addEventListener('input', () => {
        message.setCustomValidity("");
        // messenger.checkValidity();
    });
    
    // if (!(messenger.value && nickname.value) && !email.value && !phone.value) {
    //     alert('Please, fill in at least one of the following fields: messenger + nickname, email or phone');
    // }
    // if (!message.value)
    //     alert('Please, leave us some additional information in the message field');
}