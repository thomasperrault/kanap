//window.location.href renvoi un string qui contient l'url de la page où je me trouve
let str = window.location.href;
console.log(str)
//new URL renvoi un objet représnetant l'URL définie
let urlProduct = new URL(str);
console.log(urlProduct)
//searchParams.get("id") renvoi le paramètre id de mon URL
let idProduct = urlProduct.searchParams.get("id");
console.log(idProduct)


//Récupération des données de l'API avec constante et fetch en fonction de l'id
const getProducts = async function () {
    let response = await fetch("http://localhost:3000/api/products/" +idProduct)
    let data = await response.json()
    return data;
}

//Répartition de chaque attribut du produit de l'API dans le DOM
let products = getProducts().then(data => {
      console.log(data)

    //Insertion de l'élément "img"
    let productImg = document.createElement("img");
    //querySelector= retourne élement item__img
    //appendChild = ajoute un noeud à la fin de la liste des enfants d'un noeud
    document.querySelector(".item__img").appendChild(productImg); 
    //va chercher l'image et son "alt" correspondant à l'id
    productImg.src = data.imageUrl
    productImg.alt = data.altTxt

    //Insertion de l'élément name dans un "h1" avec l'id "title"
    document.getElementById("title").innerHTML = data.name

    //Insertion de l'élément prix dans un "span" avec l'id "price"
    document.getElementById("price").innerHTML = data.price

    //Insertion de l'élément description dans un "p" avec l'id "description"
    document.getElementById("description").innerHTML = data.description

    //Insertion de l'élément couleur dans un "option"
    console.log(data.colors)
    for(let getColor of data.colors){
        console.log('color', getColor)
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors)
        productColors.innerHTML = getColor;
    }})
