/* 1 DECLARATION DES VARIABLES */
let cart = window.localStorage.getItem("product");
let productInLocalStorage= JSON.parse(cart); //Cart sans le prix
let cartItems = document.getElementById('cart__items');
let cartContent;

async function loadPage() {
    /* Création du cart */
    
    cartContent = await initCart();
   
    /* 2 AFFICHAGE DU PANIER ET DES TOTAUX */
    //Affichage du panier
    showCart(cartContent);
    //Calcul et affichage des totaux (prix et quantité)
    showTotal(cartContent);

    /* 3 MODIFICATION DE QUANTITE ET SUPPRESSION */
    //Ecoute du listener de la modifcation de quantité
    addListernerQuantity(cartContent);
    //Ecoute du listener de la suppression d'un élément
    addListenerDelete(cartContent, cartItems)

    /* 4 FORMULAIRE VALIDATION */
    //Ecoute du bouton commander
    //Ecoute des inputs du formulaire 
}

loadPage();