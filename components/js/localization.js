const strings = require('../../lang/localization.json');

export async function localize(locale = 'en') {

    for (let key in strings) {
        document.querySelectorAll('#'+key)
        .forEach(el => {
            el.innerHTML = strings[key][locale]
        });
    }
}