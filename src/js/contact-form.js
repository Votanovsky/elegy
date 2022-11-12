import { gsap } from 'gsap';

function showNotification() {
    const notification = document.createElement('div');
    notification.className = "message-sent-notification";
    notification.id = "notification";
    // notification.innerHTML = "Message sent successfully";
    document.querySelector('body').appendChild(notification);
    gsap.set(notification, {display: "flex", delay: 0.2});
    gsap.to(notification, {opacity: 0, duration: 3, delay: 0.2, ease: 'power3.in'});
    gsap.set(notification, {display: "none", delay: 3.2});
}

export function validateForm(loadPage) {                        // валидация ввода формы контактов
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const   form        = document.querySelector('form.form'), 
            messenger   = document.querySelector('#messenger'),
            nickname    = document.querySelector('#nickname'),
            email       = document.querySelector('#email'),
            phone       = document.querySelector('#phone'),
            message     = document.querySelector('#message');

    // messenger.setCustomValidity(document.getElementById('contact_error').innerHTML);                                                         // а также поле message
    // message.setCustomValidity(document.getElementById('message_error').innerHTML);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!(messenger.value && nickname.value) && !email.value && !phone.value) {         // проверяем, чтобы были заполнены либо поля messenger+nickname, либо email, либо phone
            messenger.setCustomValidity(document.getElementById('contact_error').innerHTML);
        }
        else if (!message.value) {                                                          // а также поле message
            message.setCustomValidity(document.getElementById('message_error').innerHTML);
        }
        else {                                  // если все нужные поля заполнены, убираем предупреждения, отправляем форму и показываем сообщение об отправке
            messenger.setCustomValidity("");
            message.setCustomValidity("");
            let body = JSON.stringify({ "messenger": messenger.value, "nicknme": nickname.value, "email": email.value, "phone": phone.value, "message": message.value })
            await delay(500);                   // маленькая задержка перед отправкой (опционально)
            // form.submit();
            fetch('/php/mail_form.php', {
                method: 'POST',
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: body
            })
            .then(response => response.text());
            // .then(response => console.log(response));
            loadPage();
            showNotification();
            // console.log(JSON.stringify({ "messenger": messenger.value, "nicknme": nickname.value, "email": email.value, "phone": phone.value, "message": message.value }));
        }
    });

    messenger.addEventListener("input", () => {
        if (!(messenger.value && nickname.value) && !email.value && !phone.value) {         // проверяем, чтобы были заполнены либо поля messenger+nickname, либо email, либо phone
            messenger.setCustomValidity(document.getElementById('contact_error').innerHTML);
        }
        else
            messenger.setCustomValidity("");
        // messenger.checkValidity();
    });

    nickname.addEventListener('input', () => {
        if (!(messenger.value && nickname.value) && !email.value && !phone.value) {         // проверяем, чтобы были заполнены либо поля messenger+nickname, либо email, либо phone
            messenger.setCustomValidity(document.getElementById('contact_error').innerHTML);
        }
        else
            messenger.setCustomValidity("");
        // messenger.checkValidity();
    });

    email.addEventListener('input', () => {
        if (!(messenger.value && nickname.value) && !email.value && !phone.value) {         // проверяем, чтобы были заполнены либо поля messenger+nickname, либо email, либо phone
            messenger.setCustomValidity(document.getElementById('contact_error').innerHTML);
        }
        else
            messenger.setCustomValidity("");
        // messenger.checkValidity();
    });

    phone.addEventListener('input', () => {
        if (!(messenger.value && nickname.value) && !email.value && !phone.value) {         // проверяем, чтобы были заполнены либо поля messenger+nickname, либо email, либо phone
            messenger.setCustomValidity(document.getElementById('contact_error').innerHTML);
        }
        else
            messenger.setCustomValidity("");
        // messenger.checkValidity();
    });
    
    message.addEventListener('input', () => {
        // if (!message.value) {                                                          // а также поле message
        //     message.setCustomValidity(document.getElementById('message_error').innerHTML);
        // }
        // else
            message.setCustomValidity("");
        // messenger.checkValidity();
    });
    
    // if (!(messenger.value && nickname.value) && !email.value && !phone.value) {
    //     alert('Please, fill in at least one of the following fields: messenger + nickname, email or phone');
    // }
    // if (!message.value)
    //     alert('Please, leave us some additional information in the message field');
}