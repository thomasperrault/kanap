//window.location.href renvoi un string qui contient l'url de la page où je me trouve
let str = window.location.href;
console.log(str)
//new URL renvoi un objet représnetant l'URL définie
let urlProduct = new URL(str);
console.log(urlProduct)
//searchParams.get("id") renvoi le paramètre id de mon URL
let idProduct = urlProduct.searchParams.get("id");
console.log(idProduct)
