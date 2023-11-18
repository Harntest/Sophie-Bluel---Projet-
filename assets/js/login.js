//Voici un exemple de code que tu peux utiliser pour authentifier l'utilisateur :

const form = document.getElementById("formLogin");
const myData = new FormData(form);

form.addEventListener("submit", (event) => {

  event.preventDefault();
  const myData = new FormData(event.target);
    const data = {};
    myData.forEach((value, key) => {
      data[key] = value;
  });
  
  // Créer une requête POST avec Fetch.
  const request = new Request("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
    body: JSON.stringify(data),
  });

  // Envoie les valeurs des entrées du formulaire au serveur.
  fetch(request)
  .then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Soucis de mdp');
    }
  })
  
  .then(data => {
      // Handle successful login here
      // TODO :
      // set localStorage item pour récupe dans index et afficher la bar d'édition

      localStorage.setItem('utilisateur', JSON.stringify(data));

      // cacher la bar d'édition dans le css et l'afficher avec le js ( style.display = "block" )
      // tu as déjà la récupèration de local storage et la dynamic cacher montrer de la bar

      window.location.href = 'index.html'; // Redirect to index.html on success
  })
});


/*// Vérifie si un jeton d'accès est présent dans le stockage local.
const token = localStorage.getItem("token");
if (token) {
  // Redirige l'utilisateur vers la page index.html s'il a déjà un jeton d'accès.
  window.location.href("./index.html");
}

// Sélectionne l'élément du formulaire ayant l'ID "formLogin".
const formLogin = document.querySelector("#formLogin");

// Ajoute un écouteur d'événements pour le formulaire lorsqu'il est soumis.
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  // Récupère la valeur de l'email et du mot de passe saisis dans le formulaire.
  const email = formLogin.email.value;
  const password = formLogin.password.value;

  // Effectue une requête POST à l'API pour se connecter, en spécifiant l'URL de l'API et les options de la requête.
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Convertit l'email et le mot de passe en JSON et les inclut dans le corps de la requête.
    body: JSON.stringify({ email, password }),
  })
    // Convertit la réponse HTTP en objet JSON pour une manipulation plus facile.
    .then((response) => response.json())
    .then((data) => {
      // Vérifie si la réponse de l'API contient un jeton d'accès.
      if (data.token) {
        // Enregistre le jeton d'accès dans le stockage local du navigateur.
        localStorage.setItem("token", data.token);
        // Redirige l'utilisateur vers la page index.html.
        window.location.href = "index.html";
      } else {
        // Affiche une alerte en cas d'erreur d'identification.
        alert("Erreur dans l'identifiant ou le mot de passe");
      }
    });
}); */