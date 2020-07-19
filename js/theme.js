let body = document.querySelector('body'),
bigLetters = document.getElementsByClassName('bigLetter'),
a = document.querySelectorAll('a'),
button = document.getElementById('switch-on'),
switchOn=false,
lightTheme=true;

function setVisibleLight() { //  texte  blanc - fond noir
    body.id = "visible-light";
    button.style.color = "var(--text-color-light)";
    for (let k=0 ; k<bigLetters.length ; k++)
    {
        bigLetters[k].style.color = "var(--text-color-light)";
    }
    for (let l=0 ; l<a.length ; l++)
    {
        a[l].className = 'visible-link-light';
    }
}
function setVisibleDark() { //  texte  noir - fond blanc
    body.id = "visible-dark";
    button.style.color = "var(--text-color-dark)";
    for (let k=0 ; k<bigLetters.length ; k++)
    {
        bigLetters[k].style.color = "var(--text-color-dark)";
    }
    for (let l=0 ; l<a.length ; l++)
    {
        a[l].className = 'visible-link-dark';
    }
}
function setDarkTheme() {
    body.id = null;
    button.style.color = "var(--text-color-light)";
    for (let k=0 ; k<bigLetters.length ; k++)
    {
        bigLetters[k].style.color = "var(--text-color-light)";
    }
    for (let l=0 ; l<a.length ; l++)
    {
        a[l].className = 'dark-theme';
    }
}
function setLightTheme() {
    body.className = null;
    body.id = null;
    button.style.color = "var(--text-color-dark)";
    for (let k=0 ; k<bigLetters.length ; k++)
    {
        bigLetters[k].style.color = 'var(--text-color-dark)';
    }
    for (let l=0 ; l<a.length ; l++)
    {
        a[l].className = null;
    }
}
function switchOnTheLight() {
    switch(switchOn)
    {
        case false :if (lightTheme)
                    {
                        setVisibleDark();
                    }
                    else
                    {
                        setVisibleLight();
                    }
                    switchOn=true;
        break;
        case true :if (lightTheme)
                    {
                        setLightTheme();
                    }
                    else
                    {
                        setDarkTheme();
                    }
                    switchOn=false;
        break;
    }
}
function mouseoverThemeAction() {
    if (lightTheme) {
        setVisibleLight();
    } else {
        setVisibleDark();
    }
}
function mouseoutThemeAction() {
    if (lightTheme) {                  // SI fond blanc !
        setLightTheme();
    } else {                                    // SI fond noir !
        setDarkTheme();
    }
}
function clickThemeAction() {
    if (lightTheme) // Le theme passe au theme dark
    {
        body.className = 'dark-theme';
        setDarkTheme();
        lightTheme=false;
        switchOn=false;
    }
    else
     {                            // Le theme original revient
        setLightTheme();
        lightTheme=true;
         switchOn=false;
     }
}


// ********** LIGHT BOUTON **********
button.addEventListener('click', switchOnTheLight, true);

// ********** SPANS ACTIONS **********
for (let i=0; i<bigLetters.length; i++) {
    let bigLetter = bigLetters[i];
    bigLetter.addEventListener('mouseover', mouseoverThemeAction, false);
    bigLetter.addEventListener('mouseout', mouseoutThemeAction, false);
    bigLetter.addEventListener('click', clickThemeAction, false);
}