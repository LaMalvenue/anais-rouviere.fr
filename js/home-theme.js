const indexMd = document.querySelector('#index-md');
const indexLg = document.querySelector('#index-lg');

function lgDevice() {
    const clickableArea = document.createElement('div');
    clickableArea.className = "clickable-area";
    const linkToPresentation = document.createElement('a');
    linkToPresentation.href = "presentation.html";
    clickableArea.appendChild(linkToPresentation);

    const videoLg = document.createElement('video');
    videoLg.id = "video-background-lg";
    videoLg.setAttribute('autoplay', '');
    videoLg.setAttribute('playsinline', '');
    videoLg.setAttribute('muted', '');
    const sourceVideo = document.createElement('source');
    sourceVideo.type ="video/mp4";
    sourceVideo.src = "img/background-lg.mov";
    sourceVideo.alt = "Video de fond";
    videoLg.muted = true;
    videoLg.play();
    videoLg.appendChild(sourceVideo);

    indexLg.appendChild(clickableArea);
    indexLg.appendChild(videoLg);
}
function mdDevice(){
    const clickableAreaSmall = document.createElement('div');
    clickableAreaSmall.className = "clickable-area-small";
    const linkToPresentationSmall = document.createElement('a');
    linkToPresentationSmall.href = "presentation.html";
    clickableAreaSmall.appendChild(linkToPresentationSmall);

    const videoMd = document.createElement('video');
    videoMd.id = "video-background-md";
    videoMd.setAttribute('autoplay', '');
    videoMd.setAttribute('playsinline', '');
    videoMd.setAttribute('muted', '');
    const sourceVideoMd = document.createElement('source');
    sourceVideoMd.type ="video/mp4";
    sourceVideoMd.src = "img/background-small.mov";
    sourceVideoMd.alt = "Video de fond";
    videoMd.appendChild(sourceVideoMd);
    videoMd.muted = true;
    videoMd.play();

    indexMd.appendChild(clickableAreaSmall);
    indexMd.appendChild(videoMd);
}
function isEmpty(tag) {
    return document.querySelector(tag).innerHTML.trim() === "";
}
function onResize() {
    if("matchMedia" in window) {
        if(window.matchMedia("(min-width:992px)").matches)
        {
            indexLg.style.display="block";
            indexMd.style.display="none";
            if(isEmpty("#index-lg"))
            {
                lgDevice();
            }
        }
        else if(window.matchMedia("(min-width:576px) and (max-width:991px)").matches)
        {
            indexMd.style.display="block";
            indexLg.style.display="none";
            if(isEmpty("#index-md"))
            {
                mdDevice();
            }
        }
        else if(window.matchMedia("(max-width:575px").matches)
        {
            indexLg.style.display="none";
            indexMd.style.display="none";
        }
    }
}

if(window.matchMedia("(min-width:992px)").matches)
{
    lgDevice();
}
else if(window.matchMedia("(min-width:576px)").matches)
{
    mdDevice();
}

window.addEventListener('resize', onResize, false);