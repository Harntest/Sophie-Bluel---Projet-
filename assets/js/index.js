// fonction async pour récupérer les données de l'api et les afficher dans la galerie
const workApi = "http://localhost:5678/api/works";
const galleryContainer = document.querySelector(".gallery");

async function getWorks() {
    console.log("getWorks called");
    fetch(workApi)
        .then((response) => response.json())
        .then((works) => {
            works.forEach((work) => {
                galleryContainer.innerHTML += `
                <figure data-category="${work.category.id}">
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>
            `;
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

getWorks();


// fonction permettant de filtrer les œuvres par catégorie
function filterWorks(categoryId) {
    const figures = document.querySelectorAll("figure");
    figures.forEach((figure) => {
        if (categoryId == 0) {
            figure.style.display = "block";
        } else if (figure.dataset.category == categoryId) {
            figure.style.display = "block";
        } else {
            figure.style.display = "none";
        }
    });
}

// fonction permettant d'ajouter des récepteurs d'événements aux boutons de filtrage, après qu'ils aient été ajoutés au DOM par la fonction getCategories
function addFilterBtnsEventListeners() {
    const filtersBtns = document.querySelectorAll(".filters button");
     
    // Ajoute la classe "btn" à tous les boutons.
  filtersBtns.forEach((btn) => {
    btn.classList.add("btn");
  });

    filtersBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filtersBtns.forEach((btn) => {
                btn.classList.remove("btn-active");
            });
            btn.classList.add("btn-active");
            filterWorks(btn.dataset.id);
        });
    });
}

// fonction asyc pour récupérer les données de l'api et les afficher dans les filtres
const categoriesApi = "http://localhost:5678/api/categories";
const filtersContainer = document.querySelector(".filters");

async function getCategories() {
    fetch(categoriesApi)
        .then((response) => response.json())
        .then((categories) => {
            categories.forEach((category) => {
                filtersContainer.innerHTML += `
                <button data-id="${category.id}">${category.name}</button>
            `;
            });

            // créer un bouton "tous" pour afficher tous les travaux
            const allBtn = document.createElement("button")
            
            allBtn.setAttribute("data-id", "0");
            allBtn.textContent = "Tous";
            /*allBtn.classList.add(".active");*/
            

            filtersContainer.prepend(allBtn);
            
            

            // <button data-id="0" class="active">Tous</button>

            // ajouter des récepteurs d'événements après que les boutons aient été ajoutés au DOM
            addFilterBtnsEventListeners();
        })
        
        .catch((error) => {
            console.log(error);
        });
}

getCategories();


//Active la bar uniquement quand tu es connecté

    function activateDynamicBar() {

        if (localStorage.getItem("utilisateur") !== null) {
            // L'utilisateur est connecté, donc active la barre dynamique.
            const user = JSON.parse(localStorage.getItem('utilisateur'));
            console.log('connected', user)
            document.querySelector(".editionMode").style.display = "flex";
        } else {
            // L'utilisateur n'est pas connecté, donc masque la barre dynamique.
            document.querySelector(".editionMode").style.display = "none";
        }
    }
        
    // Lorsque la page se charge, vérifie si l'utilisateur est connecté et active la barre dynamique en conséquence.
    window.addEventListener("load", activateDynamicBar);

    
    // --               Modal 1            --//    
   
   // Sélectionne l'élément modal ayant l'ID "modal".
const modal = document.querySelector("#modal");

const buttonModifier = document.querySelector("#button-modifier");

   
   // Sélectionne l'élément modal ayant l'ID "modal".
    // const openModal = function (e) {
    //     e.preventDefaut()
    //     const target = document.querySelector(e.target.getAttribute('href'))
    // }
    // document.querySelectorAll("#modal").forEach(a => {
    //     a.addEventListener('click', openModal)
        
    // })
    
    




// Fonction pour afficher la première modal
const goModal1 = () => { 
  // Affiche la modal principale
  modal.style.display = "block"; 
}
  
  // Sélectionne l'élément ayant la classe "modalContainer"
  const modalContainer = document.querySelector(".modalContainer")


