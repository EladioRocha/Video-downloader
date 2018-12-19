const ytdl = require('./../../config/ytdl');
const path = require('path');

const controller = {
  index: (req, res) => {
    res.render('index');
  },

  receiveData: (req, res) => {
    let response = ytdl.download(req.body.link);
    response.then(data => {
      res.json(data);
    })
  },

  downloadVideo: (req, res) => {
    // console.log(req)
    const folder = req.params.folder;
    const name = req.params.video;
    const extension = folder.toLowerCase();
    const url = path.resolve(__dirname, '../', '../', 'download', folder, `${name}.${extension}`);
    res.download(url);
  }
}

module.exports = controller;