window.addEventListener("load", () => {

    const nameInput = document.getElementById("name-input")
    const imageInput = document.getElementById("image-input")
    const prizeInput = document.getElementById("prize-input")
    const descInput = document.getElementById("desc")
    const categInput = document.getElementById("categ-input")
    const sndBtn = document.getElementById("snd-btn")
    const form = document.getElementById("form")

    sndBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let errors = {}

        if(nameInput.value.length < 5){
            errors.name = "Debes asignar un nombre al producto"
        }
        if(descInput.value.length < 15){
            errors.desc = "Debes agregar una descripcion a tu producto (min: 15 caracteres)"
        }
        if(prizeInput.value.length < 1){
            errors.prize = "Debes asignar un precio al producto"
        }
        if(Object.keys(errors).length >= 1){
//            document.getElementById("categ-warn").innerText = (errors.category) ? errors.category : " "
            document.getElementById("desc-warn").innerText = (errors.desc) ? errors.desc : " "
            document.getElementById("name-warn").innerText = (errors.name) ? errors.name : " "
            document.getElementById("prize-warn").innerText = (errors.prize) ? errors.prize : " "
            document.getElementById("image-warn").innerText = (errors.image) ? errors.image : " "
        }else{
            form.submit()
        }
    })
})