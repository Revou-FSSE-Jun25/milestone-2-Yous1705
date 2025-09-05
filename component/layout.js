function loadComponent(id, file) {
    return fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error("Error loading", file, err));
}

window.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "../component/header.html");
    loadComponent("footer", "../component/footer.html");
});