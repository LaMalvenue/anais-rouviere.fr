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

// ************ ICON DOWNLOAD ************
var downloadIcon = document.querySelector('.download-icon');
var downloadIconHover = document.querySelector('.download-icon-hover');
var buttonDownload  = document.querySelector('.cv-download');

buttonDownload.addEventListener('mouseover', function () {
    downloadIcon.style.display = 'none';
    downloadIconHover.style.display = "inline";
});
buttonDownload.addEventListener('mouseout', function () {
    downloadIcon.style.display = 'inline';
    downloadIconHover.style.display = "none";
});