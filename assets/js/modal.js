const projectsContainer = document.querySelector('.modal-projects')

if (localStorage.getItem("utilisateur") !== null) {
    // L'utilisateur est connecté, donc active la barre dynamique.
    
    
}

function getUserToken() {
    let user = JSON.parse(localStorage.getItem('utilisateur'));
    return user.token;
}


function updateWorks() {
    getWorks()
}

async function getWorksIntoModal() {
    fetch(workApi)
        .then((response) => response.json())
        .then((works) => {
            works.forEach((work) => {
                projectsContainer.innerHTML += `
                <article>
                    <div class="btns-action">
                    <button class="modal-btn-delete">
                         <i class="fa fa-light fa-trash-can delete-icon" id="delete-icon-8"></i>
                    </button>
                    </div>
                    <figure data-category="${work.category.id}" data-projectid="${work.id}">
                        <img src="${work.imageUrl}" alt="${work.title}">
                    </figure>
                </article>
            `;
            });
            deleteWorks()
        })
        .catch((error) => {
            console.log(error);
        });
}

getWorksIntoModal();




// function de suppression d'image

function deleteWorks() {
    console.log('deleteWorks appelée');
    let btnsDelete = document.querySelectorAll('.btns-action');

    btnsDelete.forEach((del) => {
        del.addEventListener('click', () => {
            let userToken = getUserToken();
            if (!userToken) {
                console.error('User token not found');
                return;
            }
            const figureElement = del.closest('article').querySelector('figure');
            const itemId = figureElement.dataset.projectid;
            console.log(itemId);

            fetch(`http://localhost:5678/api/works/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'application/json'
                },
            })
            .then(data => {
                console.log('Succès :', data);
                
                // Reconstruire la galerie ici (en appelant une fonction getWorks par exemple)
                galleryContainer.innerHTML = ""; // vider la galerie avant de la reconstruire
                let works = updateWorks();
                getWorksIntoModal() 
                // Reconstruire la gallery sur la homePage aussi si nécessaire
                // updateHomePage();
            })
            .catch((error) => {
                console.error('Erreur :', error);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    deleteWorks(); // Ajoute les écouteurs d'événements de suppression après le chargement du DOM
});



// Une fois supprimer : Reconstuire la gallery avec le getWorks
// Reconstruire la gallery sur la homePage aussi


