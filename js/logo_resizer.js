(function () {

    const logo = document.getElementById('logo-gallery');
    const header = document.querySelector('header');

    const scrollY = function () {
        const supportPageOffset = window.pageXOffset !== undefined;
        const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"); // Compatibilité
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    window.resizeLogo = function () {
        const headerHeight = header.offsetHeight;

        // Fonctions
        const onScroll = function () {
            if (scrollY() < headerHeight) {
                if (headerHeight - scrollY() > 99) {
                    logo.style.height = (headerHeight - scrollY()) + 'px';
                }
            } else if (scrollY() >= headerHeight) {
                logo.style.height = '100px';
            }
        }
        const onResize = function () {
            window.reload();
            logo.style.height = "100vh";
            onScroll()
        }

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize)
    }

    resizeLogo(logo)

})()