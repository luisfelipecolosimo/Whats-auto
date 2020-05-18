var fs = require('fs');
module.exports = {

  fileToBase64 (filepath) {
    return fs.readFileSync(filepath, { encoding: 'base64' });
  }
  
}

