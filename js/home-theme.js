var indexMd = document.querySelector('#index-md');
var indexLg = document.querySelector('#index-lg');

function lgDevice() {
    var clickableArea = document.createElement('div');
    clickableArea.className = "clickable-area";
    var linkToPresentation = document.createElement('a');
    linkToPresentation.href = "presentation.html";
    clickableArea.appendChild(linkToPresentation);

    var videoLg = document.createElement('video');
    videoLg.id = "video-background-lg";
    videoLg.setAttribute('autoplay', '');
    videoLg.setAttribute('playsinline', '');
    videoLg.setAttribute('muted', '');
    var sourceVideo = document.createElement('source');
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
    var clickableAreaSmall = document.createElement('div');
    clickableAreaSmall.className = "clickable-area-small";
    var linkToPresentationSmall = document.createElement('a');
    linkToPresentationSmall.href = "presentation.html";
    clickableAreaSmall.appendChild(linkToPresentationSmall);

    var videoMd = document.createElement('video');
    videoMd.id = "video-background-md";
    videoMd.setAttribute('autoplay', '');
    videoMd.setAttribute('playsinline', '');
    videoMd.setAttribute('muted', '');
    var sourceVideoMd = document.createElement('source');
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