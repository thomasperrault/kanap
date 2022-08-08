//window.location.href renvoi un string qui contient l'url de la page où je me trouve
let str = window.location.href;
console.log(str)
//new URL renvoi un objet représnetant l'URL définie
let urlProduct = new URL(str);
console.log(urlProduct)
//searchParams.get("id") renvoi le paramètre id de mon URL
let idProduct = urlProduct.searchParams.get("id");
console.log(idProduct)

//Récupération des données de l'API avec fetch
fetch("http://localhost:3000/api/products/" +idProduct)
    //Modification du resultat en .json
        .then(products => products.json())
        .then(
            function(result){
            showProducts(result)
            showColors(result.colors)
            }
)

//Création de la fonction showProducts pour implémenter le HTML avec les infos du produit
function showProducts(products){
    console.log(products)
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
                    </select>
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

    // A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR 
    // A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR 
    // A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR 
    // A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR A REVOIR 

    //Prise en compte du click sur le bouton 'ajouter au panier' une fois toute les données intégrées
    const btnBasket = document.getElementById("addToCart");
    btnBasket.addEventListener("click", addToCart);

    function addToCart(){

        //Récupération du choix des couleurs
        let colorList;
        let colorChoice;
        colorList = document.getElementById("colors");
        colorChoice = colorList.options[colorList.selectedIndex].text;
        console.log("colorChoice", colorChoice)
    
        //Récupération du choix de la quantité   
        const quantityPicked = document.querySelector("#quantity");
        let quantityChoice = quantityPicked.value;
        console.log("quantityChoice", quantityChoice)
    
        //Récupération des données pour localstorage   
        let infoProductChoice = {
            InfoIdProduct: idProduct,
            InfoNameProduct: products.name,
            InfoColorProduct: colorChoice,
            InfoQuantityProduct: Number(quantityChoice),
            InfoPriceProduct: products.price,
            InfoImgProduct: products.imageUrl,
            InfoAltImgProduct: products.altTxt,
            InfoDescriptionProduct: products.description,
        }
        console.log("infoProductChoice", infoProductChoice)


        //Popup de confirmation d'ajout au panier
        //Condition pour validation panier et intégration au local storage (présence couleur et quantité comprise entre 1 et 100)
        if (quantityChoice <= 0 || quantityChoice > 100){ //Erreur > On s'arrête
            alert("Veuillez entrer une valeur comprise entre 1 et 100")
        } 
        else if(colorChoice == "--SVP, choisissez une couleur --"){ //Erreur > On s'arrête
            alert("Veuillez choisir une couleur")
        } 
        else{ // Ok on continue avec message et intégration au local storage
                //window.confirm affiche une fenêtre. Ok=True=If=Panier Annuler=False=Else=Accueil
                if(window.confirm(`Le canapé ${infoProductChoice.InfoNameProduct} ${infoProductChoice.InfoColorProduct} (Quantité : ${infoProductChoice.InfoQuantityProduct})
a bien été ajouté à votre panier.
Pour consulter le panier : OK
Pour revenir à l'accueil : ANNULER`)){
                    window.location.href = "./cart.html";
                }
                else{
                    window.location.href = "./index.html"
                }

            //Local Storage : stock les valeurs du panier
            //Déclaration de la variable productInLocalStorage
            //JSON.parse converti les données au format JSON qui sont dans le localstorage en objet JS
            let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
            console.log(productInLocalStorage);

            //S'il y a déjà des produits enregistré dans le LS
            if(productInLocalStorage){
                productInLocalStorage.push(infoProductChoice);
                localStorage.setItem("product",JSON.stringify(productInLocalStorage));
                console.log(productInLocalStorage);
                popupConfirmation();
            }
            //S'il n'y a pas de produits enregistré dans le LS
            else{
                productInLocalStorage = [];
                productInLocalStorage.push(infoProductChoice);
                localStorage.setItem("product",JSON.stringify(productInLocalStorage));
                console.log(productInLocalStorage);
                popupConfirmation();
            }
        }
    }
}

//EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR 
//EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR 
//EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR 
//EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR 
//EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR EMPLACEMENT A REVOIR 

//Création de la fonction showColors pour implémenter le HTML avec le choix des couleurs
function showColors(colors){
    console.log(colors)
    //Déclaration de la variable html pour avoir la proposition "SVP..."
    let htmlColor=`
        <option value="">--SVP, choisissez une couleur --</option>
    `
    //Boucle pour chaque couleurs
    for(let color of colors){
    //Utilisation de Ecma script ES6 pour intégration des données dans le HTML
    htmlColor+=` 
        <option value=>${color}</option>
    `
    }
    //Affichage dans le HTML de la partie couleur
    document.querySelector("#colors").innerHTML=htmlColor
}

