export function loadHeader() {
    fetch("./components/parts/header.html")
    .then(response => response.text())
    .then(text => document.body.querySelector("header").innerHTML = text);
}
