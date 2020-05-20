var fs = require('fs');





module.exports = {

  async listar(file){
    var res = fs.readFileSync(file, 'utf8');
    /*fs.readFile('ids.txt', 'utf8', (err, data)=>{
      console.log(data);
      var arrayOfStrings = data.split(",");
      console.log(arrayOfStrings);
    });*/

    var arrayOfStrings = res.split(",");
    return arrayOfStrings;
  },

  async addId(file,id){
    var res = fs.readFileSync(file, 'utf8');
    if(res==''){
      fs.writeFileSync(file, id);
    }
    else{
      fs.writeFileSync(file, res+','+id);
    }
    
  }


}