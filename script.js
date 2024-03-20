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


 // Modal
 fetch('data.json')
 .then(response => response.json())
 .then(data => {
   // Une fois les données chargées avec succès, écoutez les clics sur les boutons
   document.querySelectorAll('.btn').forEach((button, index) => {
     button.addEventListener('click', function() {
       // Récupérer les données spécifiques à cette carte
       const albumName = data[index].album.name;
       const releaseDate = data[index].album.release_date;

       // Mettre à jour le contenu du modal avec les données récupérées
       document.getElementById('albumName').textContent = albumName;
       document.getElementById('releaseDate').textContent = releaseDate;
     });
   });
 })
 .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));