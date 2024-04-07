fetch('data.json') // requête vers le fichier JSON
  .then(response => response.json()) // convertir la réponse textuelle en JSON
  .then(data => {
    // traiter les données
    console.log(data);
  });

  function setTrackList(data){
    // récupération du template
    let template = document.getElementById('trackCard');

    // parcourir les chansons
    for (let i = 0; i < data.length; i++) {
        // faire un clone tu template
        const clone = template.content.cloneNode(true);

        let artists= getDisplayArtists(data[i].artists);

        // remplir le clone
        clone.querySelector('.card-title').textContent = data[i].name;
        clone.querySelector('.card-text').textContent = artists;
        clone.querySelector('.card-img-top').src = data[i].album.images[0].url;
        clone.querySelector('.card-img-top').alt = data[i].name;

        // ajouter le clone au DOM dans le conteneur
        document.getElementById('trackList').appendChild(clone);
    }
}
 

document.addEventListener('DOMContentLoaded', function () {
  // Modal
  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  
  // Récupérer les données JSON
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Templates
      setTrackList(data);

      // Gérer les clics sur les boutons "Écouter"
      document.querySelectorAll('.listen-btn1').forEach((button, index) => {
        button.addEventListener('click', function(event) {
          event.preventDefault(); // Empêcher l'action par défaut du bouton
          // Récupérer les données spécifiques à cette carte en utilisant l'index du bouton
          const albumName = data[index].album.name;
          const releaseDate = data[index].album.release_date;

          // Mettre à jour le contenu du modal avec les données récupérées
          document.getElementById('albumName').textContent = albumName;
          document.getElementById('releaseDate').textContent = releaseDate;

          // Ouvrir le modal
          modal.show();
        }); 
      });
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
});

// Fonction pour remplir la liste de pistes
function setTrackList(data) {
  let template = document.getElementById('trackCard');
  for (let i = 0; i < data.length; i++) {
    const clone = template.content.cloneNode(true);
    let artists = data[i].artists[0].name;
    clone.querySelector('.card-title').textContent = data[i].name;
    clone.querySelector('.card-text').textContent = artists;
    clone.querySelector('.card-img-top').src = data[i].album.images[0].url;
    clone.querySelector('.card-img-top').alt = data[i].name;
    clone.querySelector('.listen-btn1').dataset.index = i; // Ajouter l'index de la piste aux boutons "Écouter"
    document.getElementById('trackList').appendChild(clone);
  }
}


// Templates
  fetch('data.json') // requête vers le fichier JSON  
  .then(response => response.json()) // convertir la réponse textuelle en JSON  
  .then(data => {     // traiter les données   
  console.log(data);    
  setTrackList(data);   });  
  function setTrackList(data){ // récupération du template   
  let template = document.getElementById('trackCard');      // parcourir les chansons     
  for (let i = 0; i < data.length; i++) {         // faire un clone tu template     
  const clone = template.content.cloneNode(true);       
  let artists= data[i].artists[0].name;          // remplir le clone      
  clone.querySelector('.card-title').textContent = data[i].name;         
  clone.querySelector('.card-text').textContent = artists;        
 clone.querySelector('.card-img-top').src = data[i].album.images[0].url;        
 clone.querySelector('.card-img-top').alt = data[i].name;          // ajouter le clone au DOM dans le conteneur        
 document.getElementById('trackList').appendChild(clone);     } }



// Fonction pour créer un graphique de popularité avec Chart.js
function createPopularityChart(data) {
  // Récupérer les noms et la popularité de chaque musique du fichier JSON
  const trackNames = data.map(track => track.name);
  const popularityValues = data.map(track => track.album.popularity);

  // Créer le graphique à barres avec Chart.js
  const ctx = document.getElementById('popularityChart').getContext('2d');
  const popularityChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: trackNames,
          datasets: [{
              label: 'Popularité de la musique',
              data: popularityValues,
              backgroundColor: 'midnightblue',
              borderColor: 'midnightblue',
              borderWidth: 0
          }]
      },
      options: {
        responsive: false, // Permet au graphique de s'adapter à la taille du conteneur
        maintainAspectRatio: false,
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Popularité'
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: 'Musiques'
                  }
              }
          }
      }
  });
}

// Charger les données JSON et créer le graphique une fois qu'elles sont disponibles
fetch('data.json')
  .then(response => response.json())
  .then(data => {
      createPopularityChart(data);
  })
  .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));


  fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Ajouter un gestionnaire d'événements de clic pour les boutons d'écoute dans chaque carte de piste
    document.querySelectorAll('.track').forEach((card, index) => {
        const listenButton = card.querySelector('.listen-btn');
        listenButton.addEventListener('click', function(event) {
            event.preventDefault(); // Empêcher le comportement par défaut du bouton
            // Récupérer l'URL Spotify de la piste actuelle
            const spotifyUrl = data[index].external_urls.spotify;
            // Ouvrir l'URL Spotify dans un nouvel onglet
            window.open(spotifyUrl, '_blank');
        });
    });
  })
  .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));