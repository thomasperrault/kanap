//Récupération des données de l'API avec constante et fetch
const getProducts = async function () {
    let response = await fetch("http://localhost:3000/api/products")
    let data = await response.json()
    return data;
}

//Répartition de chaque produit de l'API dans le DOM
let products = getProducts().then(data => {
    for(let product of data){
      console.log('product', product)
    
    //Insertion de l'élément "a" avec son href correspondant à _id
    let productLink = document.createElement("a");
    //querySelector= retourne premier élement 
    //appendChild = ajoute un noeud à la fin de la liste des enfants d'un noeud
    document.querySelector(".items").appendChild(productLink); 
    //va chercher le lien et l'intègre au href
    productLink.href = `./product.html?id=${product._id}`;

    //Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    //Insertion de l'élément "img"
    let productImg = document.createElement("img");
    productArticle.appendChild(productImg);
    //va chercher l'image dans le tableau à imageUrl et l'intègre au HTML > src
    productImg.src = product.imageUrl
    //va chercher le alt de l'image dans le tableau à altTxt et l'intègre au HTML > alt
    productImg.alt = product.altTxt

    //Insertion de l'élément "h3"
    let productName = document.createElement("h3");
    productArticle.appendChild(productName)
    productName.innerHTML = product.name

    //Insertion de l'élément "p"
    let productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.innerHTML = product.description










}})


    












    //Elément <a> avec "_id" pour le lien vers la page produit

    //Elément <image> avec "imageUrl" et "altText" pour l'image du produit

    //Elément <h3> avec "name" pour le nom du produit

    //Elément <p> avec "description" pour la description du produit

      // Répartition des données de l'API dans le DOM

          // Répartition des données de l'API dans le DOM

          