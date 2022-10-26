export async function loadFooter() {
    await fetch("./components/parts/footer.html")
    .then(response => response.text())
    .then(text => document.body.querySelector("footer").innerHTML = text);
}