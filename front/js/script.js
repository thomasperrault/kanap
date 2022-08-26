//Récupération des données de l'API avec fetch
fetch("http://localhost:3000/api/products")
  //Modification du resultat en .json
  .then(products => products.json())
  .then(
    function(result){
      showProducts(result)
    }
  )

function showProducts(products){
  //Déclaration de la variable html vide pour la remplir ensuite dans la boucle
  let html="";
  for(let product of products){
    //Utilisation de Ecma script ES6 pour intégration des données dans le HTML
    html+=` 
    <a href="./product.html?id=${product._id}">
    <article>
      <img src=${product.imageUrl} alt=${product.altTxt}>
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
    </a>
    `
  }
  //Affichage dans le HTML
  document.querySelector("#items").innerHTML=html
}