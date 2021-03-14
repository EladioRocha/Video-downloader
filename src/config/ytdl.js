const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
  download: (link) => {
    let estado = false;
    function downloadVideo() {
      return new Promise((resolve, reject) => {
        const saveUrlMP3 = path.resolve(__dirname, '../', 'download', 'MP3', ytdl.getVideoID(link));
        const saveUrlMP4 = path.resolve(__dirname, '../', 'download', 'MP4', ytdl.getVideoID(link));
        const saveUrlWEBM = path.resolve(__dirname, '../', 'download', 'WEBM', ytdl.getVideoID(link));
        const audioMP4 = fs.createWriteStream(`${saveUrlMP4}.mp4`);
        const audioMP3 = fs.createWriteStream(`${saveUrlMP3}.mp3`);
        const auidoWEBM = fs.createWriteStream(`${saveUrlWEBM}.webm`);
        ytdl(link).pipe(audioMP4);
        ytdl(link).pipe(audioMP3);
        ytdl(link).pipe(auidoWEBM);
        let itsOk = 0;
        setInterval(function () {
          if (audioMP4.closed) {
            clearInterval(this)
            itsOk++;
          }
        }, 1000)
        console.log('=========')
        setInterval(function () {
          if (audioMP3.closed) {
            clearInterval(this)
            itsOk++;
          }
        }, 1000)
        console.log('=========')
        setInterval(function () {
          if (auidoWEBM.closed) {
            clearInterval(this)
            itsOk++;
          }
        }, 1000)
        setInterval(function () {
          if (itsOk === 3) {
            const data = {
              size: audioMP4.bytesWritten,
              name: ytdl.getVideoID(link),
              status: true
            }
            console.log(data);
            clearInterval(this)
            resolve(data)
          }
        }, 3000)
      })
    }
    return new Promise((resolve, reject) => {
      downloadVideo().then((data) => {
        if (data.status) {
          resolve(data)
        }
      })
    })
  }

}


