export function loadFooter() {
    fetch("./components/parts/footer.html")
    .then(response => response.text())
    .then(text => document.body.querySelector("footer").innerHTML = text);
}