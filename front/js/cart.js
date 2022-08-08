//Récupération des données du local storage
let cart = window.localStorage.getItem("product");
//Modification du format en JSON
let cartArray= JSON.parse(cart);
console.log(cartArray);

//Déclaration cartItems issue du HTML
let cartItems = document.getElementById('cart__items');

//Déclaration de la fonction makeCards pour intégration du code HTML
function makeCards(cartArray){
    let html="";
    for(let i=0; i<cartArray.length; i++){
        html = `
            <article class="cart__item" data-id="${cartArray[i].infoIdProdct}" data-color="{product-color}">
                <div class="cart__item__img">
                    
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${cartArray[i].InfoNameProduct}</h2>
                        <p>${cartArray[i].InfoColorProduct}</p>
                        <p>${cartArray[i].InfoPriceProduct} €</p>
                    </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartArray[i].InfoQuantityProduct}">
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
makeCards(cartArray);


