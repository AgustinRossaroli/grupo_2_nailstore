window.addEventListener("load", () => {

    const menu = document.getElementsByClassName("menu")[0];
    const list = document.getElementsByClassName("list-box")[0];
    const cart = document.getElementsByClassName("cart")[0];

    menu.addEventListener("click", (e) => {
        menu.style.display = "none";
        list.style.display = "block";
        cart.style.display = "block"
    })
})
