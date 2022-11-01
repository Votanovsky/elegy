export async function loadFooter() {
    await fetch("html/includes/footer.html")
    .then(response => response.text())
    .then(text => document.body.querySelector("footer").innerHTML = text);
}