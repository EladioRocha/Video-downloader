//Constants
const btnDownload = document.getElementById('download');
const youtubeLink = document.getElementById('youtube-link');
const dataLink = document.getElementById('data-link');
const video = document.getElementById('preview-video');

//Globals
var videoName;

//Functions
const sendData = (e) => {
  const verifiy = inputNoEmpty();
  if(verifiy){
    addMessageError();
    removeMessageError();
    return false;
  }
  setSrcVideo(getYoutubeLink());
  showAnimationDownloading();
  fetch('/receiveData', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getYoutubeLink())
  })
  .then(resp => resp.json())
  .then(resp => {
    videoName = resp.name;
    hideAnimationDownloading();
    alert('The video are ready to download');
    putFileSize(resp.size);
    putButtonsToDownload();
  })
};

const inputNoEmpty = () => {
  if(!youtubeLink.value){
    return true;
  }
  return false;
}

const addMessageError = () => {
  const h5 = document.createElement('h5');
  h5.classList = 'red-text';
  h5.innerText = 'ERROR: The url input is empty'
  dataLink.append(h5);
}

const removeMessageError = () => {
  setTimeout(() => {
    dataLink.removeChild(dataLink.lastChild);
  }, 3000);  
}

const getYoutubeLink = () => {
  let ytLink = {
    link: youtubeLink.value
  }
  return ytLink;
}

const setSrcVideo = ({link}) => {
  const newLink = modifyLinkToEmbed(link);
  video.setAttribute('src', newLink);
}

const modifyLinkToEmbed = (link) => {
  const getPosWatch = link.indexOf('watch');
  const getSymbolEqual = (link.indexOf('=') + 1);
  const replaceString = link.slice(getPosWatch, getSymbolEqual);
  const newLink = link.replace(replaceString, 'embed/');
  return newLink;
}

const putButtonsToDownload = () => {
  const btnDownload = document.querySelectorAll('.button-download')
  for(let i = 0; i < btnDownload.length; i++){
    btnDownload[i].innerHTML = '';
  }

  for(let i = 0; i < btnDownload.length; i++){
    const btnToDownload = document.createElement('button');
    btnToDownload.innerHTML = 'Download';
    btnToDownload.setAttribute('class', 'btn bg-last');
    btnDownload[i].append(btnToDownload);
    btnToDownload.addEventListener('click', downloadVideo);
  }
}

const putFileSize = (size) => {
  const fileSize = document.querySelectorAll('.file-size');
  for(let i = 0; i < fileSize.length; i++){
    fileSize[i].innerHTML = '';
  }

  for(let i = 0; i < fileSize.length; i++){
    const infoVideoSize = document.createElement('span');
    infoVideoSize.innerHTML = `${result = convertToMebibyte(size)} MB`;
    fileSize[i].append(infoVideoSize);
  }
}

const convertToMebibyte = (sizeInByte) => {
  const mebibyte = 1048576;
  let result = sizeInByte / mebibyte;
  return result.toFixed(2);
}

const showAnimationDownloading = () => {
  const animationDownloading = document.querySelector('#animation-downloading');
  animationDownloading.classList.remove('hide');
}

const hideAnimationDownloading = () => {
  const animationDownloading = document.querySelector('#animation-downloading');
  animationDownloading.className = 'hide'
}

const downloadVideo = (e) => {
  const folderName = e.target.parentNode.id
  const url = `${window.location.href}downloadVideo/${folderName}/${videoName}`
  window.open(url);
}

//Listeners
document.addEventListener('DOMContentLoaded', function() {
  const opts = {classes: 'white-text'}
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems, opts);
});

btnDownload.addEventListener('click', sendData);


