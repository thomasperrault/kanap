
/*VERIFICATION FORMULAIRE*/
//Vérification du Prénom
function getFirstNameValidation(){
    return document.getElementById("firstNameErrorMsg");
}
document
    .getElementById("firstName")
    .addEventListener("input", function(e) {
        if (/[a-z,.'-]+$/.test(e.target.value)){
            getFirstNameValidation().innerText = "";
        }else{
            getFirstNameValidation().innerText = "Veuillez renseigner votre prénom"
            }
    });

//Vérification du Nom
function getLastNameValidation(){
    return document.getElementById("lastNameErrorMsg");
}
document
    .getElementById("lastName")
    .addEventListener("input", function(e) {
        if (/[a-z,.'-]+$/.test(e.target.value)){
            getLastNameValidation().innerText = "";
        }else{
            getLastNameValidation().innerText = "Veuillez renseigner votre nom"
            }
    });

//Vérification de l'adresse
function getAddressValidation(){
    return document.getElementById("addressErrorMsg");
}
document
    .getElementById("address")
    .addEventListener("input", function(e) {
        if (/[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(e.target.value)){
            getAddressValidation().innerText = "";
        }else{
            getAddressValidation().innerText = "Veuillez renseigner votre adresse"
            }
    });

//Vérification de la ville
function getCityValidation(){
    return document.getElementById("cityErrorMsg");
}
document
    .getElementById("city")
    .addEventListener("input", function(e) {
        if (/[a-z,.'-]+$/.test(e.target.value)){
            getCityValidation().innerText = "";
        }else{
            getCityValidation().innerText = "Veuillez renseigner votre ville"
            }
    });
    
//Vérification de l'email
function getEmailValidation(){
    return document.getElementById("emailErrorMsg");
}
document
    .getElementById("email")
    .addEventListener("input", function(e) {
        if (/[A-z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/.test(e.target.value)){
            getEmailValidation().innerText = "";
        }else{
            getEmailValidation().innerText = "Veuillez renseigner votre email"
            }
    });
    
    



/*SAUVEGARDE DONNEES FORMULAIRE
//Envoi de la commande client au LocalStorage
function postForm(e) {
    //Ecoute du bouton 'commander'
    let btnCommander = document.getElementById("order");
    btnCommander.addEventListener("click", (event)=>{
        //Récupération des produits commandés
        //Récupération des données client
        let inputFirstName = document.getElementById("firstName");
        console.log(inputFirstName);
        let inputLastName = document.getElementById("lastName");
        let inputAddress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputEmail = document.getElementById("email");
    })
    }
postForm();*/