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
        let infoProduct = {
            InfoIdProduct: idProduct,
            InfoNameProduct: products.name,
            InfoColorProduct: colorChoice,
            InfoQuantityProduct: Number(quantityChoice),
            InfoPriceProduct: products.price,
            InfoImgProduct: products.imageUrl,
            InfoAltImgProduct: products.altTxt,
            InfoDescriptionProduct: products.description,
        }
        console.log("infoProduct", infoProduct)
    
        //Condition pour validation panier (présence couleur et quantité comprise entre 1 et 100)
        if (quantityChoice <= 0 || quantityChoice > 100){
            alert("Veuillez entrer une valeur comprise entre 1 et 100")
        } else if(colorChoice == "--SVP, choisissez une couleur --"){
            alert("Veuillez choisir une coleur")
        } else{     
            alert("Produit ajouté au panier avec succès");
        }
    }
    
}

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

