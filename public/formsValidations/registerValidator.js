window.addEventListener("load", () => {
    
    const nameInput = document.querySelector("#name-input")
    const passInput = document.querySelector("#pass-input")
    const emailInput = document.querySelector("#email-input")
    const birthInput = document.querySelector("#birth-date")
    const imageInput = document.querySelector("#image")
    const nameWarn = document.querySelector("#name-warn")
    const emailWarn = document.querySelector("#email-warn")
    const passWarn = document.querySelector("#pass-warn")
    const birthWarn = document.querySelector("#birth-warn")
    const imageWarn = document.querySelector("#image-warn")
    const form = document.querySelector("#register-form")
    const sendBtn = document.querySelector("#boton")

    sendBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let errors = {}

        if(nameInput.value.length < 2){
            errors.name = "Debes ingresar un nombre"
        }
        if(emailInput.value.length < 2){
            errors.email = "Debes ingresar un email"
        }else if(emailInput.value.includes("@" && "." && "com") == false){
            errors.email = "Debes ingresar un email valido"
        }
        if(passInput.value.length < 2){
            errors.password = "Debes ingresar una contraseña (min: 8 caracteres)"
        }else if(passInput.value.length < 8){
            errors.password = "Debes ingresar una contraseña mas larga"
        }
        if(birthInput.value.length == 0){
            errors.birthday = "Debes igresar una fecha de nacimiento"
        }
        if(imageInput.value.length < 1){
            imageInput.value.toUpperCase().includes(".JPG" || ".JEPG" || ".PNG" || ".GIF")
            errors.image = "Debes ingresar un archivo valido (.JPG, .JEPG , .PNG, .GIF)"
        }
        if(Object.keys(errors).length >= 1){
            nameWarn.innerText = (errors.name) ? errors.name : " "
            passWarn.innerText = (errors.password) ? errors.password : " "
            emailWarn.innerText = (errors.email) ? errors.email : " "
            birthWarn.innerText = (errors.birthday) ? errors.birthday : " "
            imageWarn.innerText = (errors.image) ? errors.image : " "
        }else{
            form.submit()
        }
    })
})