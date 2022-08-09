//Récupération des données du local storage
let cart = window.localStorage.getItem("product");
//Modification du format en JSON
let cartArray= JSON.parse(cart);
console.log(cartArray);

//Déclaration cartItems issue du HTML
let cartItems = document.getElementById('cart__items');

//Déclaration de la fonction getCards avec prise en compte des conditions
function getCart(){
    //Si le localstorage est vide
    if (cartArray === null || cartArray == 0){
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
        for (let infoCart of cartArray){
            let infoId = infoCart.infoIdProduct;
            console.log (infoId);
            let infoColor = infoCart.infoColorProduct;
            console.log (infoColor);
            let infoQuantity = infoCart.infoQuantityProduct;
            console.log (infoQuantity);
        }

        //Déclaration de la fonction makeCards pour intégration du code HTML
        function makeCarts(cartArray){
            let html="";
            for(let i=0; i<cartArray.length; i++){
                html = `
                    <article class="cart__item" data-id="${cartArray[i].infoIdProduct}" data-color="{product-color}">
                        <div class="cart__item__img">
                            <img src=${cartArray[i].infoImgProduct} alt=${cartArray[i].infoAltImgProduct}>
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${cartArray[i].infoNameProduct}</h2>
                                <p>${cartArray[i].infoColorProduct}</p>
                                <p>${cartArray[i].infoPriceProduct} €</p>
                            </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté :</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartArray[i].infoQuantityProduct}">
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
        //Appel de la fonction makeCards
        makeCarts(cartArray);
    }
}
//Appel de la fonction getCard
getCart();


