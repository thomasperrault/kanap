//Création du cart avec le prix
let cartElements = [];
async function initCart() {
    await Promise.all(productInLocalStorage.map(async (product) => {
        cartElements.push(await getProduct(product));
    }));
    return cartElements;
}

//Récupération des données du LS + Prix sur l'API 
function getProduct(productStorage) {
    return fetch("http://localhost:3000/api/products/" + productStorage.infoIdProduct)        
        .then(products => products.json())
        .then(
            function (result) {
                let currentProduct = {
                        infoIdProduct: productStorage.infoIdProduct,
                        infoNameProduct: productStorage.infoNameProduct,
                        infoColorProduct: productStorage.infoColorProduct,
                        infoQuantityProduct: productStorage.infoQuantityProduct,
                        infoPriceProduct: result.price,
                        infoImgProduct: productStorage.infoImgProduct,
                        infoAltImgProduct: productStorage.infoAltImgProduct,
                        infoDescriptionProduct: productStorage.infoDescriptionProduct,
                }
                return currentProduct;
            });
}

//Déclaration de la fonction getcarts avec prise en compte des conditions
function showCart(cartContent) {
    //Si le localstorage est vide
    if (cartContent == null || cartContent == 0){
        let html= ` 
                <div class="cartAndFormContainer" id="cartAndFormContainer">
                    <h1>Votre panier est vide</h1>
                </div>
            `;
        document.querySelector("#cartAndFormContainer").innerHTML=html
    }
    //Si le localstorage n'est pas vide
    else {
        let html="";
        
        for (let i = 0; i < cartContent.length; i++){
            
            html = `
                <article class="cart__item" data-id="${cartContent[i].infoIdProduct}" data-color="${cartContent[i].infoColorProduct}">
                    <div class="cart__item__img">
                        <img src=${cartContent[i].infoImgProduct} alt=${cartContent[i].infoAltImgProduct}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${cartContent[i].infoNameProduct}</h2>
                            <p>${cartContent[i].infoColorProduct}</p>
                            <p>${cartContent[i].infoPriceProduct} €</p>
                        </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartContent[i].infoQuantityProduct}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>
            `;
            cartItems.insertAdjacentHTML("beforeend", html);
        }

    }
}

//Affichage des totaux Quantité et Prix
function showTotal(carContent) {
    let quantity = 0;
    let total = 0;
    for (let i = 0; i < carContent.length; i++) {
        let currentProduct = carContent[i];
        quantity += currentProduct.infoQuantityProduct;
        total += (currentProduct.infoQuantityProduct * currentProduct.infoPriceProduct); 
    }
    document.getElementById("totalQuantity").innerHTML = quantity;
    document.getElementById('totalPrice').innerHTML = total;
}

//Mise à jour du localStorage après modif
function updateLocalStorage(cartContent) {
    let productStorages = [];
     for (let i = 0; i < cartContent.length; i++) {
         let cartProduct = cartContent[i];
         //Déclaration d'une variable avec les données à intégrer
         let productStorage = {
                        infoIdProduct: cartProduct.infoIdProduct,
                        infoNameProduct: cartProduct.infoNameProduct,
                        infoColorProduct: cartProduct.infoColorProduct,
                        infoQuantityProduct: cartProduct.infoQuantityProduct,
                        infoImgProduct: cartProduct.infoImgProduct,
                        infoAltImgProduct: cartProduct.infoAltImgProduct,
                        infoDescriptionProduct: cartProduct.infoDescriptionProduct,
         }
         productStorages.push(productStorage);
    }
    window.localStorage.setItem("product", JSON.stringify(productStorages));
}

//Ecoute de la modification de la quantité d'un produit
function addListernerQuantity(cartContent) {
    //Déclaration variable sur le input
    let quantityInputs = document.querySelectorAll(".itemQuantity");
    for (let i=0; i < quantityInputs.length; i++){
        //Evenement de modification sur le input
        quantityInputs[i].addEventListener("change" , (event) => {
            modifQuantity(cartContent[i], quantityInputs[i], cartContent);          
        })
    }
}

//Modification de la quantité d'un produit
function modifQuantity(currentProduct, currentInput, cartContent) {
    //Récupération de la quantité déclarée sur la page panier
    let quantityModifValue = currentInput.valueAsNumber;
    //Modifier la quantité du LS avec la quantité indiquée dans le input
    currentProduct.infoQuantityProduct = quantityModifValue;
    updateQuantityProduct(cartContent, currentProduct);
}

//Mise à jour du LS et affichage des totaux
function updateQuantityProduct(cartContent, addProduct) {
    for (let i = 0; i < cartContent.length; i++) {
        let currentProduct = cartContent[i];
        //Si l'id et la couleur sont identique alors on ajoute le i de la boucle au LS (Evite problème d'index)
        if (currentProduct.infoIdProduct == addProduct.infoIdProduct && currentProduct.infoColorProduct == addProduct.infoColorProduct) {
            cartContent[i].infoQuantityProduct = addProduct.infoQuantityProduct;
        }
    }
    updateLocalStorage(cartContent);
    showTotal(cartContent);
}

//Ecoute de la suppression d'un produit
function addListenerDelete(cartContent) {
    //Déclaration variable sur le bouton supprimer
    let btnSupprimer = document.querySelectorAll(".deleteItem");
    for (let i=0; i < btnSupprimer.length; i++){
        //Evenement de suppression sur le bouton
        btnSupprimer[i].addEventListener("click" , function(){
            deleteProduct(cartContent[i], cartContent)
            console.log(cartContent)
        })
    }
}

//Suppression de la quantité d'un produit dans le LS
function deleteProduct(currentProduct, cartContent) {
    //Modification de la quantité à 0 dans le LS
    currentProduct.infoQuantityProduct = 0;
    updateDeleteProduct(cartContent, currentProduct);  
}

//Mise à jour de la quantité dans le LS et affichage des totaux
function updateDeleteProduct(cartContent, delProduct) {
    //Création d'un nouveau array vide
    let newCartContent = [];
    //Boucle sur cartContent
    for (let i = 0; i < cartContent.length; i++) {
        let currentProduct = cartContent[i];
        //Ajouter dans le nouvel array si quantité != 0
        if (currentProduct.infoQuantityProduct != 0) {
            newCartContent.push(currentProduct);
        }
    }
    cartContent = newCartContent;
    alert("Ce produit a été supprimé de votre panier")
    updateLocalStorage(cartContent);

    if(cartContent.length==0) {
        showCart();
    } 
    else {
        //showCart(cartContent);
        showTotal(cartContent);

        let dataId = delProduct.infoIdProduct;
        let dataColor  = delProduct.infoColorProduct;
        let delProductHTML = cartItems.querySelector('[data-id="'+dataId+'"][data-color="'+dataColor+'"]');

        cartItems.removeChild(delProductHTML);
    }
}












//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////











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