//Création des Regex pour vérification du formulaire
let textRegex = new RegExp(/^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{2,40}$/);
let addressRegex = new RegExp(/^[A-Za-z0-9'âêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{5,50}$/);
let emailRegex = new RegExp(/[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/);

//Récupération des données du formulaires de contact
let inputFirstName = document.getElementById("firstName");
let inputLasttName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

//Ecoute des inputs du formulaire
function listenerFirstName() { //Nom
    inputFirstName.addEventListener("input", function() {
        firstNameErrorMsg()
    })
}
function listenerLastName() { //Prénom
    inputLasttName.addEventListener("input", function() {
        lastNameErrorMsg()
    })
}
function listenerAddress() { //Adresse
    inputAddress.addEventListener("input", function() {
        addressErrorMsg()
    })
}
function listenerCity() { //Ville
    inputCity.addEventListener("input", function() {
        cityErrorMsg()
    })
}
function listenerEmail() { //Email
    inputEmail.addEventListener("input", function() {
        emailErrorMsg()
    })
}

//Test avec les Regex
function isFirstNameValid() { //Nom
    return textRegex.test(inputFirstName.value); //Regex.test renvoi booléen
}
function isLastNameValid() { //Prénom
    return textRegex.test(inputLasttName.value); 
}
function isAddressValid() { //Adresse
    return addressRegex.test(inputAddress.value);
}
function isCityValid() { //Ville
    return textRegex.test(inputCity.value); 
}
function isEmailValid() { //Email
    return emailRegex.test(inputEmail.value);
}

//Affichage des messages de validation des champs
function firstNameErrorMsg() { //Nom
    if (isFirstNameValid()){
        document.getElementById("firstNameErrorMsg").innerText = ""
    }
    else{
        document.getElementById("firstNameErrorMsg").innerText = "Veuillez renseigner votre prénom"
    }
}
function lastNameErrorMsg() { //Prénom
    if (isLastNameValid()){
        document.getElementById("lastNameErrorMsg").innerText = ""
    }
    else{
        document.getElementById("lastNameErrorMsg").innerText = "Veuillez renseigner votre nom"
    }
}
function addressErrorMsg() { //Adresse
    if (isAddressValid()){
        document.getElementById("addressErrorMsg").innerText = ""
    }
    else{
        document.getElementById("addressErrorMsg").innerText = "Veuillez renseigner votre adresse"
    }
}
function cityErrorMsg() { //Ville
    if (isCityValid()){
        document.getElementById("cityErrorMsg").innerText = ""
    }
    else{
        document.getElementById("cityErrorMsg").innerText = "Veuillez renseigner votre ville"
    }
}
function emailErrorMsg() { //Email
    if (isEmailValid()){
        document.getElementById("emailErrorMsg").innerText = ""
    }
    else{
        document.getElementById("emailErrorMsg").innerText = "Veuillez renseigner votre email"
    }
}

//Ecoute du Submit du formulaire de contact
function listenerOrder (cartContent){
    const form = document.querySelector('.cart__order__form');
    form.addEventListener('submit', (e) =>{
        //Blocage du submit
        e.preventDefault();
        cartOrder(cartContent);
    })
}

//Finalisation de la commande (API/Fetch/Redirection sur page de confirmation)
function cartOrder(cartContent){
    //Récupération des données du formulaire
    let contact = { //Contact
        firstName : inputFirstName.value,
        lastName : inputLasttName.value,
        address : inputAddress.value,
        city : inputCity.value,
        email : inputEmail.value,
    }
    let idProducts = [];
    for (let i = 0; i<cartContent.length;i++) {
        idProducts.push(cartContent[i].infoIdProduct);
    }
    let products = idProducts //Produits

    //Création d'un array des données de la commande (produits+contact)
    let order = { //Données global à Post sur l'API
        contact,
        products,
    }
    console.log(order);
 
    //Post sur API 
    fetch("http://localhost:3000/api/products/order", {
        method: "post",
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(order)
    })
    .then((response) => response.json())
    .then((data) => {
        document.location.href = "confirmation.html?orderId=" + data.orderId;
        localStorage.clear();
    })
    .catch((err) => {
        console.error(err);
    }) 
}