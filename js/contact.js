// ************ SPOILER ************

var elements = document.querySelectorAll('.spoiler');

var createSpoilerButton = function (element) {

    var button = document.createElement('button'),
        span = document.createElement('span');

    // Création de la span.spoiler-content
    span.className = "spoiler-content";
    span.innerHTML = element.innerHTML;

    // Création du bouton

        if (element.classList.contains('mail')){
            button.textContent='Afficher le mail';
        } else if (element.classList.contains('telephone')){
            button.textContent='Afficher le téléphone';
        }

    // Ajout dans le DOM
    element.innerHTML='';
    element.appendChild(button);
    element.appendChild(span);

    // Evenement
    button.addEventListener('click', function(){
        button.parentNode.removeChild(button);
        span.className='visible';
    });
};

for (var i=0 ; i < elements.length ; i++){
    createSpoilerButton(elements[i]);
}