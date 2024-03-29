//window.location.href renvoi un string qui contient l'url de la page où je me trouve
let str = window.location.href;
//new URL renvoi un objet représnetant l'URL définie
let urlProduct = new URL(str);
//searchParams.get("id") renvoi le paramètre id de mon URL
let idProduct = urlProduct.searchParams.get("id");

//Récupération des données de l'API avec fetch
fetch("http://localhost:3000/api/products/" +idProduct)
    //Modification du resultat en .json
        .then(products => products.json())
        .then(
            function(result){
            showProducts(result)
            //showColors(result.colors)
            }
)

//Création de la fonction showProducts pour implémenter le HTML avec les infos du produit
function showProducts(products){
    let html=` 
        <article>
            <div class="item__img">
                <img src=${products.imageUrl} alt=${products.altTxt}>
            </div>
            <div class="item__content">

                <div class="item__content__titlePrice">
                <h1 id="title">${products.name}</h1>
                <p>Prix : <span id="price">${products.price}</span>€</p>
                </div>

                <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${products.description}</p>
                </div>

                <div class="item__content__settings">
                <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors">
                    <option value="">--SVP, choisissez une couleur --</option>
                    `;
                    //Boucle pour chaque couleurs
                for(let color of products.colors){
                    html +=`<option value=>${color}</option>`;
                }
        html +=`</select>
                </div>

                <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
                </div>

                <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
                </div>

            </div>
        </article>
    `
    //Affichage dans le HTML
    document.querySelector(".item").innerHTML=html;

   //Prise en compte du click sur le bouton 'ajouter au panier' une fois toute les données intégrées
    const btnBasket = document.getElementById("addToCart");
    btnBasket.addEventListener("click", addToCart);

    function addToCart(){

        //Récupération du choix des couleurs
        let colorList;
        let colorChoice;
        colorList = document.getElementById("colors");
        colorChoice = colorList.options[colorList.selectedIndex].text;
    
        //Récupération du choix de la quantité   
        const quantityPicked = document.querySelector("#quantity");
        let quantityChoice = quantityPicked.value;
    
        //Récupération des données pour localstorage   
        let infoProductChoice = {
            infoIdProduct: idProduct,
            infoNameProduct: products.name,
            infoColorProduct: colorChoice,
            infoQuantityProduct: Number(quantityChoice),
            infoImgProduct: products.imageUrl,
            infoAltImgProduct: products.altTxt,
            infoDescriptionProduct: products.description,
        }


        //Popup de confirmation d'ajout au panier
        //Condition pour validation panier et intégration au local storage (présence couleur et quantité comprise entre 1 et 100)
        if (quantityChoice <= 0 || quantityChoice > 100){ //Erreur > On s'arrête
            alert("Veuillez entrer une valeur comprise entre 1 et 100")
        } 
        else if(colorChoice == "--SVP, choisissez une couleur --"){ //Erreur > On s'arrête
            alert("Veuillez choisir une couleur")
        } 
        else{ // Ok on continue avec message et intégration au local storage
                //alert affiche une fenêtre.
                alert(`Le canapé ${infoProductChoice.infoNameProduct} ${infoProductChoice.infoColorProduct} (Quantité : ${infoProductChoice.infoQuantityProduct}) a bien été ajouté à votre panier.`)

            //Local Storage : stock les valeurs du panier
            //Déclaration de la variable productInLocalStorage
            //JSON.parse converti les données au format JSON qui sont dans le localstorage en objet JS
            let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

            //S'il y a déjà des produits enregistré dans le LS
            if(productInLocalStorage){
                //find recherche dans le dom l'id et couleur identique au produit ajouté
                const resultFind = productInLocalStorage.find(
                    (el) => el.infoIdProduct === idProduct && el.infoColorProduct === colorChoice);
                //S'il y a un doublon
                if(resultFind){
                    //Déclaration d'une nouvelle quantité
                    let newQuantity = 
                    //parseInt analyse une chaine de caractère fournie en argument et renvoie un entier
                    parseInt(infoProductChoice.infoQuantityProduct) + parseInt(resultFind.infoQuantityProduct);
                    resultFind.infoQuantityProduct = newQuantity;
                    //Modification de la quantité dans le LS avec setItem 
                    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                }
                //S'il n'y a pas de doublon
                else{
                    //Ajout du nouveau produit au LS (Panier)
                    //push ajoute un ou pls éléments à la fin d'un tableau
                    productInLocalStorage.push(infoProductChoice);
                    localStorage.setItem("product",JSON.stringify(productInLocalStorage));
                }
            }
            //S'il n'y a pas de produits enregistré dans le LS
            else{
                //Initialisation du local storage sous forme de tableau
                productInLocalStorage = [];
                productInLocalStorage.push(infoProductChoice);
                localStorage.setItem("product",JSON.stringify(productInLocalStorage));
            }
        }
    }
}