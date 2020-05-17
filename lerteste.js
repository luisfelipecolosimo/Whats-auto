var fs = require('fs');





module.exports = {

  async listar(){
    var res = fs.readFileSync('ids.txt', 'utf8');
    /*fs.readFile('ids.txt', 'utf8', (err, data)=>{
      console.log(data);
      var arrayOfStrings = data.split(",");
      console.log(arrayOfStrings);
    });*/

    var arrayOfStrings = res.split(",");
    return arrayOfStrings;
  },

  async addId(id){
    var res = fs.readFileSync('ids.txt', 'utf8');
    fs.writeFileSync('ids.txt', res+','+id);
  }


}