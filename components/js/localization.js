const strings = require('../../lang/localization.json');

const languages = ["en", "ru"];

export async function localize(locale) {

    if (!languages.includes(locale))
        locale = "en";
        
    for (let key in strings) {
        document.querySelectorAll('#'+key)
        .forEach(el => {
            el.innerHTML = strings[key][locale]
        });
    }
}