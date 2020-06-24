(function () {

var logo = document.getElementById('logo-gallery');
var header = document.querySelector('header');

    var scrollY = function() {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"); // Compatibilité
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    window.resizeLogo = function () {
        var headerHeight = header.offsetHeight;

        // Fonctions
        var onScroll = function () {
            if (scrollY() < headerHeight) {
                if(headerHeight-scrollY()>174){
                    logo.style.height = (headerHeight-scrollY())+'px';
                }
            }  else if (scrollY() >= headerHeight) {
                logo.style.height = '175px';
            }
        }
        var onResize = function () {
            window.reload();
            logo.style.height = "100vh";
            onScroll()
        }

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize)
    }

    resizeLogo(logo)

})()