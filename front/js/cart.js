/*LOCAL STORAGE*/
//Récupération des données du local storage
let cart = window.localStorage.getItem("product");
//Modification du format en JSON
let productInLocalStorage= JSON.parse(cart);
console.log(productInLocalStorage);

/*CART*/
//Déclaration cartItems issue du HTML
let cartItems = document.getElementById('cart__items');

//Déclaration de la fonction getcarts avec prise en compte des conditions
function getCart(){
    //Si le localstorage est vide
    if (productInLocalStorage === null || productInLocalStorage == 0){
        console.log("Panier vide")
        let html="";
        //Utilisation de Ecma script ES6 pour intégration des données dans le HTML
            html=` 
                <div class="cartAndFormContainer" id="cartAndFormContainer">
                    <h1>Votre panier est vide</h1>
                </div>
            `
        //Affichage dans le HTML
        document.querySelector("#cartAndFormContainer").innerHTML=html    
    }
    //Si le localstorage n'est pas vide
    else {
        //Récupération des id, colors et quantités pour mise en place de la fonction de doublon
        for (let infoCart of productInLocalStorage){
            let infoId = infoCart.infoIdProduct;
            console.log (infoId);
            let infoColor = infoCart.infoColorProduct;
            console.log (infoColor);
            let infoQuantity = infoCart.infoQuantityProduct;
            console.log (infoQuantity);
        }

//Déclaration de la fonction makecarts pour intégration du code HTML
function makeCarts(){    
    let html="";
    for(let i=0; i<productInLocalStorage.length; i++){
        html = `
            <article class="cart__item" data-id="${productInLocalStorage[i].infoIdProduct}" data-color="${productInLocalStorage[i].infoColorProduct}">
                <div class="cart__item__img">
                    <img src=${productInLocalStorage[i].infoImgProduct} alt=${productInLocalStorage[i].infoAltImgProduct}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${productInLocalStorage[i].infoNameProduct}</h2>
                        <p>${productInLocalStorage[i].infoColorProduct}</p>
                        <p>${productInLocalStorage[i].infoPriceProduct} €</p>
                    </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].infoQuantityProduct}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>
        `
    //insertAdjacentHTML insère les noeuds dans la position spécifiée. beforeend = à l'intéreur de l'élément après son dernier enfant
    cartItems.insertAdjacentHTML("beforeend", html);
    }
}
        //Appel de la fonction makecarts
        makeCarts(productInLocalStorage);
    }
}
//Appel de la fonction getcart
getCart();

/*TOTAL QUANTITY AND PRICE*/
function getTotal(){
    //Quantity Total
    let quantityProduct = document.getElementsByClassName("itemQuantity");
    //Nombre de référence d'articles différent
    let quantityProductLenght = quantityProduct.length;
    quantityProductTotal =0;
    //Détermination du nombre d'article pour intégration au total 
    for (let i = 0; i < quantityProductLenght; ++i){
        //valueAsNumber = nbr d'élément interprété comme un nombre
        quantityProductTotal += quantityProduct[i].valueAsNumber;
    }
    //Insertion du nombre de produit dans le HTML
    let quantityCart = document.getElementById("totalQuantity");
    quantityCart.innerHTML = quantityProductTotal;
    console.log("quantityProductTotal", quantityProductTotal);

    // Price Total
    totalPrice = 0;
    for (var i = 0; i < quantityProductLenght; ++i) {
        totalPrice += (quantityProduct[i].valueAsNumber * productInLocalStorage[i].infoPriceProduct);
    }
    //Insertion du prix total dans le HTML
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log("totalPrice", totalPrice);
}
getTotal();


// Modification d'une quantité de produit
function modifQuantity() {
    //Déclaration variable sur le input
    let quantityInputs = document.querySelectorAll(".itemQuantity");

    for (let i=0; i < quantityInputs.length; i++){
        //Evenement de modification sur le input
        quantityInputs[i].addEventListener("change" , (event) => {

            //Récupération de la quantité dans le LS
            let quantityLS = productInLocalStorage[i].infoQuantityProduct;
            console.log(quantityLS)
            
            //Récupération de la quantité déclarée sur la page panier
            let quantityModifValue = quantityInputs[i].valueAsNumber;
            console.log(quantityModifValue)
            
            //Modifier la quantité du LS avec la quantité indiquée dans le input
            productInLocalStorage[i].infoQuantityProduct = quantityModifValue;
            //Ecraser le LS avec les nouvelles données
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            //Rafraichir la page après chaque clic sur l'input
            location.reload();
        })
    }
}
modifQuantity();

//Suppression d'un article du panier
function deleteProduct(){
    //Déclaration variable sur le bouton supprimer
    let btnSupprimer = document.querySelectorAll(".deleteItem");

    for (let i=0; i < btnSupprimer.length; i++){
        //Evenement de suppression sur le bouton
        btnSupprimer[i].addEventListener("click" , function(){

            //Modifier la quantité du LS à 0
            productInLocalStorage[i].infoQuantityProduct = 0;
            console.log(productInLocalStorage)

            //Suppression du produit = 0 du LS
            productInLocalStorage.splice(i, 1);

            //Ecraser le LS avec les nouvelles données
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));

            //Rafraichir la page après chaque clic sur l'input
            alert("Ce produit a été supprimé de votre panier")
            location.reload();
        })
    }
}
deleteProduct();

/*VERIFICATION FORMULAIRE*/
//Vérification du Prénom
function getFirstNameValidation(){
    return document.getElementById("firstNameErrorMsg");
}
document
    .getElementById("firstName")
    .addEventListener("input", function(e) {
        if (/[a-z,.'-]+$/.test(e.target.value)){
            getFirstNameValidation().innerText = "";
        }else{
            getFirstNameValidation().innerText = "Veuillez renseigner votre prénom"
            }
    });

//Vérification du Nom
function getLastNameValidation(){
    return document.getElementById("lastNameErrorMsg");
}
document
    .getElementById("lastName")
    .addEventListener("input", function(e) {
        if (/[a-z,.'-]+$/.test(e.target.value)){
            getLastNameValidation().innerText = "";
        }else{
            getLastNameValidation().innerText = "Veuillez renseigner votre nom"
            }
    });

//Vérification de l'adresse
function getAddressValidation(){
    return document.getElementById("addressErrorMsg");
}
document
    .getElementById("address")
    .addEventListener("input", function(e) {
        if (/[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(e.target.value)){
            getAddressValidation().innerText = "";
        }else{
            getAddressValidation().innerText = "Veuillez renseigner votre adresse"
            }
    });

//Vérification de la ville
function getCityValidation(){
    return document.getElementById("cityErrorMsg");
}
document
    .getElementById("city")
    .addEventListener("input", function(e) {
        if (/[a-z,.'-]+$/.test(e.target.value)){
            getCityValidation().innerText = "";
        }else{
            getCityValidation().innerText = "Veuillez renseigner votre ville"
            }
    });
    
//Vérification de l'email
function getEmailValidation(){
    return document.getElementById("emailErrorMsg");
}
document
    .getElementById("email")
    .addEventListener("input", function(e) {
        if (/[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/.test(e.target.value)){
            getEmailValidation().innerText = "";
        }else{
            getEmailValidation().innerText = "Veuillez renseigner votre email"
            }
    });
    
    



/*SAUVEGARDE DONNEES FORMULAIRE
//Envoi de la commande client au LocalStorage
function postForm(e) {

    //Ecoute du bouton 'commander'
    let btnCommander = document.getElementById("order");
    btnCommander.addEventListener("click", (event)=>{

        //Récupération des produits commandés

        //Récupération des données client
        let inputFirstName = document.getElementById("firstName");
        console.log(inputFirstName);
        let inputLastName = document.getElementById("lastName");
        let inputAddress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputEmail = document.getElementById("email");

    })
    }

postForm();*/