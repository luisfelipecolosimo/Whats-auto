var fs = require('fs');
module.exports = {

  fileToBase64 (filepath) {
    return fs.readFileSync(filepath, { encoding: 'base64' });
  },

  base64_encode (file) {
    var body = fs.readFileSync(file);
    return body.toString('base64');
}
  
}

