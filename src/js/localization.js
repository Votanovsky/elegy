const strings = require('../lang/localization.json');

const languages = ["en", "ru"];


export function getLocale() {
    
    let userLocale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    return userLocale;
}

export function switchLang(language){

    let locale;
    for (let key in strings["language"]){
        locale = (language.innerText === strings["language"][key]) ? key : locale;
        console.log(key)
        console.log(locale)
    }

    locale = languages[
        (languages.indexOf(locale) + 1 >= languages.length) 
        ? 0
        : (languages.indexOf(locale) + 1)]
    
    // localize(locale);
    return locale;
}

export async function localize(locale) {

    if (!languages.includes(locale))
        locale = "en";
        
    for (let key in strings) {
        document.querySelectorAll('#'+key)
        .forEach(el => { 
            // el.innerHTML = el.innerHTML === ' ' || el.innerHTML === '' ? strings[key][locale] : strings[key][locale] + el.innerHTML;
            el.innerHTML = strings[key][locale];
            if (el.placeholder)
                el.placeholder = strings[key][locale];
        });
    }
}