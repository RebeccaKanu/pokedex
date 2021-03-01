/*I-CONFIGURATION DU FETCH*/
let fetch_config = {
    method: "GET",
    header: {
        "Content-Type": 'application/json',
    }
}

/*II-RECUPERATION DES DONNEES HTML

   /*a)Bouton*/
let prev = document.querySelector(".left-button")
let next = document.querySelector(".right-button")

/*b)Ecrans droite et gauche*/
let listItem = Array.from(document.querySelector('.right-container__screen').children);
let mainScreenBlackFirstChild = document.querySelector('.main-section__black').children[0];

/*c)Information sur le poké*/
let pokeName = document.querySelector('.poke-name')
let pokeWeight = document.querySelector('.poke-weight')
let pokeHeight = document.querySelector('.poke-height')
let pokeType = Array.from(document.querySelector('.stats__types').children)
let pokeTypeTwo = document.querySelector('.poke-type-two')

/*III-INITIALISATION DES VARIABLES*/

let urlNext = 0;
let urlId = 0;
let number = 0;
let items = "";

/*IV-FONCTIONS*/

function removeBackgroundFromAbsentType() {

    if (data.types[1] == null) {

        document.querySelector('.poke-type-two').classList.add('hidePoke')

        if (pokeTypeTwo.classList.contains('showPoke')) {
            pokeTypeTwo.classList.replace('showPoke', 'hidePoke')
        }
    }
    else if (data.types[1] !== null) {
        document.querySelector('.poke-type-two').classList.replace('hidePoke', 'showPoke')

    }

}
function transformId() {

    let idInArray = `${data.id}`

    if (idInArray.length == 1) document.querySelector('.poke-id').textContent = `#00${idInArray}`

    else if (idInArray.length == 2) document.querySelector('.poke-id').textContent = `#0${idInArray}`


    else document.querySelector('.poke-id').textContent = `#${data.id}`

}


/*IV-REQUETES*/

/*a)Première requête hors click prev et next*/

function getPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon', fetch_config)

        .then(function (response) {

            response.json()

                .then(function (data) {

                    /** 1-affichage sur l'écran de droite de la liste des pokémons **/

                    for (let index = 0; index <= data.results.length; index++) {

                        number += 1

                        listItem[index].textContent = `${number}.${data.results[index].name}`


                        /** 2-affichage des éléments sur l'écran de droite au click **/

                        data.results.forEach((e, index) => {

                            listItem[index].addEventListener('click', function () {

                                fetch(e.url, fetch_config)

                                    .then(function (response) {

                                        response.json()

                                            .then(function (data) {

                                                //changement du background dynamiquement:
                                                mainScreenBlackFirstChild.setAttribute("class", `${data.types[0].type.name}`)


                                                pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1)
                                                pokeWeight.textContent = data.weight
                                                pokeHeight.textContent = data.height


                                                //récupération du chiffe:
                                                function transformId() {

                                                    let idInArray = `${data.id}`

                                                    if (idInArray.length == 1) document.querySelector('.poke-id').textContent = `#00${idInArray}`

                                                    else if (idInArray.length == 2) document.querySelector('.poke-id').textContent = `#0${idInArray}`


                                                    else document.querySelector('.poke-id').textContent = `#${data.id}`

                                                }
                                                transformId()

                                                //recupération du type:
                                                data.types.forEach((e, index) => {

                                                    pokeType[index].textContent = e.type.name

                                                //récupération des images:
                                                    document.querySelector('.screen__image').children[0].src = `${data.sprites.front_default}`
                                                    document.querySelector('.screen__image').children[1].src = `${data.sprites.back_default}`

                                                })

                                                //Retirage du background du second lorsqu'il n'y en a pas
                                                if (data.types[1] == null) {

                                                    document.querySelector('.poke-type-two').classList.add('hidePoke')

                                                    if (pokeTypeTwo.classList.contains('showPoke')) {
                                                        pokeTypeTwo.classList.replace('showPoke', 'hidePoke')
                                                    }
                                                }
                                                else if (data.types[1] !== null) {
                                                    document.querySelector('.poke-type-two').classList.replace('hidePoke', 'showPoke')

                                                }



                                            })
                                    })

                            })

                        })




                    }


                })
        })
}
getPokemon()


/*b)Requêtes au click*/

/*1-Requête déclenché au click du bouton next*/



next.addEventListener('click', function () {

    urlNext += 20;


    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${urlNext}&limit=20`, fetch_config)

        .then(function (response) {

            response.json()

                .then(function (donnee) {

                   

                        donnee.results.forEach((e, index) => {

                            let urlSplit = e.url.split("/pokemon")
                            let urlSplitTwoo = urlSplit[1].split("/")
                            let numberOfPoke = urlSplitTwoo[1]
    
                            listItem[index].textContent = `${numberOfPoke}.${e.name}`
    
                            listItem[index].addEventListener('click', function () {
    
                                fetch(e.url, fetch_config)
    
                                    .then(function (response) {
                                        response.json()
    
                                            .then(function (data) {
    
                                                //changement du background dynamiquement:
                                                mainScreenBlackFirstChild.setAttribute("class", `${data.types[0].type.name}`)
    
    
                                                pokeName.textContent = data.name
                                                pokeWeight.textContent = data.weight
                                                pokeHeight.textContent = data.height
    
                                                //récupération du chiffe:
                                                function transformId() {
    
                                                    let idInArray = `${data.id}`
    
                                                    if (idInArray.length == 1) document.querySelector('.poke-id').textContent = `#00${idInArray}`
    
                                                    else if (idInArray.length == 2) document.querySelector('.poke-id').textContent = `#0${idInArray}`
    
    
                                                    else document.querySelector('.poke-id').textContent = `#${data.id}`
    
                                                }
                                                transformId()
    
                                                //recupération du type:
                                                data.types.forEach((e, index) => {
    
                                                    pokeType[index].textContent = e.type.name
    
                                                    //récupération des images:
                                                    document.querySelector('.screen__image').children[0].src = `${data.sprites.front_default}`
                                                    document.querySelector('.screen__image').children[1].src = `${data.sprites.back_default}`
    
                                                })
    
                                                //Retirage du background du second lorsqu'il n'y en a pas
                                                if (data.types[1] == null) {
    
                                                    document.querySelector('.poke-type-two').classList.add('hidePoke')
    
                                                    if (pokeTypeTwo.classList.contains('showPoke')) {
                                                        pokeTypeTwo.classList.replace('showPoke', 'hidePoke')
                                                    }
                                                }
                                                else if (data.types[1] !== null) {
                                                    document.querySelector('.poke-type-two').classList.replace('hidePoke', 'showPoke')
    
                                                }
    
    
    
                                            })
                                    })
    
                            })
                        })
        
                    

                  

                });
        })
})

/*1-Requête déclenché au click du bouton prev*/

prev.addEventListener('click', function () {

    urlNext -= 20;

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${urlNext}&limit=20`, fetch_config)

        .then(function (response) {

            response.json()

                .then(function (donnee) {

                    donnee.results.forEach((e, index) => {

                        let urlSplit = e.url.split("/pokemon")
                        let urlSplitTwoo = urlSplit[1].split("/")
                        let numberOfPoke = urlSplitTwoo[1]

                        listItem[index].textContent = `${numberOfPoke}.${e.name}`

                        listItem[index].addEventListener('click', function () {

                            fetch(e.url, fetch_config)

                                .then(function (response) {
                                    response.json()

                                        .then(function (data) {

                                            mainScreenBlackFirstChild.setAttribute("class", `${data.types[0].type.name}`)

                                            //récupération du name:
                                            pokeName.textContent = data.name

                                            //récupération du poids:
                                            pokeWeight.textContent = data.weight

                                            //récupération de la taille:
                                            pokeHeight.textContent = data.height

                                            //récupération du chiffe:
                                            function transformId() {

                                                let idInArray = `${data.id}`

                                                if (idInArray.length == 1) document.querySelector('.poke-id').textContent = `#00${idInArray}`

                                                else if (idInArray.length == 2) document.querySelector('.poke-id').textContent = `#0${idInArray}`


                                                else document.querySelector('.poke-id').textContent = `#${data.id}`

                                            }
                                            transformId()

                                            console.log(transformId(1));

                                            //récupération du type: 
                                            if (data.types[1] == null) {

                                                document.querySelector('.poke-type-two').classList.add('hidePoke')

                                                if (pokeTypeTwo.classList.contains('showPoke')) {
                                                    pokeTypeTwo.classList.replace('showPoke', 'hidePoke')
                                                }
                                            }
                                            else if (data.types[1] !== null) {
                                                document.querySelector('.poke-type-two').classList.replace('hidePoke', 'showPoke')
                                            }
                                            data.types.forEach((e, index) => {

                                                //récupération des types:
                                                pokeType[index].textContent = e.type.name

                                                //récupération des images:
                                                document.querySelector('.screen__image').children[0].src = `${data.sprites.front_default}`
                                                document.querySelector('.screen__image').children[1].src = `${data.sprites.back_default}`

                                            })
                                        })

                                })
                        })

                    })
                })
        })
})




