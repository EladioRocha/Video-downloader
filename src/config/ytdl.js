const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
  download: (link) => {
    let estado = false;
    function downloadVideo(){
      return new Promise((resolve, reject) => {
      ytdl.getBasicInfo(link, (err, info) => {
        if (err) throw err;
        const saveUrlMP3 = path.resolve(__dirname, '../', 'download', 'MP3', info.video_id);
        const saveUrlMP4 = path.resolve(__dirname, '../', 'download', 'MP4', info.video_id);
        const saveUrlWEBM = path.resolve(__dirname, '../', 'download', 'WEBM', info.video_id);
        const audioMP4 = fs.createWriteStream(`${saveUrlMP4}.mp4`);
        const audioMP3 = fs.createWriteStream(`${saveUrlMP3}.mp3`);
        const auidoWEBM = fs.createWriteStream(`${saveUrlWEBM}.webm`);
        ytdl(link).pipe(audioMP4);
        ytdl(link).pipe(audioMP3);
        ytdl(link).pipe(auidoWEBM);
        let itsOk = 0;
        setInterval(function () {
          if(audioMP4.closed){
            clearInterval(this)
            itsOk++;
          }
        }, 1000)
        console.log('=========')
        setInterval(function () {
          if(audioMP3.closed){
            clearInterval(this)
            itsOk++;
          }
        }, 1000)
        console.log('=========')
        setInterval(function () {
          if(auidoWEBM.closed){
            clearInterval(this)
            itsOk++;
          }
        }, 1000)
        setInterval(function(){
          if(itsOk === 3){
            const data = {
              size: audioMP4.bytesWritten,
              name: info.video_id,
              status: true
            }
            console.log(data);
            clearInterval(this)
            resolve(data)
          }
        }, 3000)
      })
    })
  }
  return new Promise((resolve, reject) => {
    downloadVideo().then((data) => {
      if(data.status){
        resolve(data)
      }
    })
  })
  }

}


