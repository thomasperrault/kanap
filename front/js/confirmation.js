function getId(){

    //Récupération de orderId dans l'Url
    let orderUrl = location.href;
    let url = new URL(orderUrl);
    let orderIdUrl = url.searchParams.get("orderId");
    return orderIdUrl;
}

//Affichage de l'orderId en html
let orderId = document.querySelector("#orderId");
orderId.innerHTML = getId();