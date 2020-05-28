// import { create, Whatsapp } from '@open-wa/wa-automate';
const wa = require("@open-wa/wa-automate");
const fs = require('fs');
const ev = require("@open-wa/wa-automate").ev;
const readTXT = require('./lerteste');
const convertimg = require('./convertimg');

wa.create().then((client) => start(client));

var quantidade = 0;
var nome = "";
var menssage = "";

ev.on('qr.**', async qrcode => {
  //Printa o qr code no formato base 64 no console
  console.log('QRCode Base64', qrcode);

  //Converte o qrcode em arquivo, e salva na raiz com o nome qr_code.png
  const imageBuffer = Buffer.from(
    qrcode.replace('data:image/png;base64,', ''),
    'base64'
  );
  fs.writeFileSync('qr_code.png', imageBuffer);
});

async function start(client) {
  client.onMessage(async(message) => {

    var arrayOfStrings = message.body.split("=");
    console.log(arrayOfStrings+' : '+message.from);
    
    

    //para criar
    if (arrayOfStrings[0] === "Criar") {
      if (quantidade <= 0) {
        client.sendText(message.from, "qual a quantidade? "+message.from);
      } else if (nome == "") {
        client.sendText(message.from, "qual o nome?");
      } else {
        //client.sendText(message.from, '👋 Hello!');
        client.sendText(message.from, "Grupos criados");
        var res = await readTXT.listar('ids.txt');
        for (let i = 0; i < quantidade; i++) {
          if (res[0]=='') {
            var cont =0
          }
          else{
            var cont =res.length
          }        
         var users=[message.from,"5519981398566","5519981302441@c.us","5541987252533@c.us"];
          let gnome = nome + " " + (i +10+ 1+cont);
          console.log(gnome)
          var ori = Promise.resolve(client.createGroup(gnome,users));
          ori.then(async function (v) {
            
            console.log(v)
            var icon = await convertimg.fileToBase64('logo.jpeg')
            
             Promise.resolve(client.setGroupIcon(v.gid._serialized,icon));
            
            readTXT.addId('ids.txt',v.gid._serialized);
            
            
            
          });
        }
      }
    }

    if (arrayOfStrings[0] === "Comandos") {
     await client.sendText(message.from, "Ola, bom vindo ao assistente de grupo");
     await client.sendText(message.from, "Para poder *criar um grupo* primeiro é preciso arrumar algumas coisas");
     await client.sendText(message.from, "Primeiro, é preciso falar a *quantidade* de grupos, para isso me mande um *'Quantidade=numerodegrupo'*");
     await client.sendText(message.from, "Depois o *nome padrão*, para isso me mande um *'Nome=nomedoegrupo'* o nome tera um acréscimo automático com os numeros");
     await client.sendText(message.from, "Por fim é preciso apenas mandar *'Criar'*");

     await client.sendText(message.from, "Agora, para *mandar mensagem para todos os grupos*");
     await client.sendText(message.from, "Primeiro, é preciso falar a *mensagem* que os grupos receberão, para isso me mande um *'Msg=mensagem'*");
     await client.sendText(message.from, "Por fim é preciso apenas mandar *'Mandar'*");
     await client.sendText(message.from, "*Aviso, todos os comandos começam com letra maiúscula.*");
    }

    if(arrayOfStrings[0] === "Quantidade"){
      var integer = parseInt(arrayOfStrings[1], 10);
      quantidade = integer;
      client.sendText(message.from, "quantidade mudada para: "+integer);
    }

    if(arrayOfStrings[0] === "Nome"){
      nome = arrayOfStrings[1];
      client.sendText(message.from, "nome mudado para: "+nome);
    }

    if(arrayOfStrings[0] === "Msg"){
      menssage = arrayOfStrings[1];
      client.sendText(message.from, "menssagem mudada para: "+menssage);
    }

    if(arrayOfStrings[0] === "Mandar"){
      if(menssage!=''){
        var res = await readTXT.listar('ids.txt');
      client.sendText(message.from, "menssagem mudada para os grupos");

      res.forEach((item)=>{
        client.sendText(item, menssage);
      })
      }
      else{
        client.sendText(message.from, "qual a menssagem?");
      }
    }

    if(arrayOfStrings[0] === "MandarG"){
      if(menssage!=''){
        var res = await readTXT.listar('idsantigos.txt');
      client.sendText(message.from, "menssagem mudada para os grupos");

      res.forEach((item)=>{
        client.sendText(item, menssage);
      })
      }
      else{
        client.sendText(message.from, "qual a menssagem?");
      }
    }


    if(arrayOfStrings[0]=='adm'){
      var res = await readTXT.listar('ids.txt');
      client.sendText(message.from, "so adm");

      res.forEach(async (item)=>{
        /*Promise.resolve(client.setGroupToAdminsOnly(item,true))
        .then(function (d) {
          console.log(d)
        });
            //await  Promise.resolve(client.setGroupToAdminsOnly(item,true));
            
            Promise.resolve(client.promoteParticipant(item,message.from))
            .then(function (a) {});*/

            var link = Promise.resolve(client.getGroupInviteLink(item));
            link.then(function (c){
              console.log(c)
              readTXT.addId('links.txt',c+'\n');
            });
            
      })

      
      
    }

    if(arrayOfStrings[0]=='Mandarm'){
      var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
    + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
    + "3gAAAABJRU5ErkJggg==";
// strip off the data: url prefix to get just the base64-encoded bytes
var data = img.replace(/^data:image\/\w+;base64,/, "");
var buf = new Buffer.alloc(data, 'base64');
fs.writeFile('image.png', buf);
      
      /* var icon = await convertimg.base64_encode('logo.jpeg')
      
      var img = await fs.readFileSync('logo.jpeg', { encoding: 'base64' });

      var imageAsBase64 = fs.readFileSync('logo.jpeg', 'base64');

      imageAsBase64 = 'data:img/jpeg;base64,' + imageAsBase64;
      
      var ori = Promise.resolve(client.sendFile('5519999610009@c.us',imageAsBase64,'some file.jpeg', `Hello this is the caption`))
      ori.then(async function(v){
        console.log(v)
      });
      //fs.writeFileSync('teste.jpeg', img);
      fs.writeFile('teste.jpeg', img, 'binary', function(err){});
      
    var ori = Promise.resolve(client.sendImage(message.from,img,"logo.jpeg","salve"))
      ori.then(async function(v){
        console.log(v)
      }); 
     try {
        var ori = await client.sendImage(message.from, img , "logo.jpeg" , "salve");
        console.log(ori)
      }
      catch(err) {
        console.log(err)
        next(err);
      }*/
      
    }

    if (message.mimetype && message.from=='5519999610009@c.us') {
      console.log('aq')
      const filename = `${message.t}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        'base64'
      )}`;
      console.log(filename)
      console.log(mediaData)
      console.log(imageBase64)
      fs.writeFile(filename, mediaData, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
      });
      await client.sendImage(
        message.from,
        imageBase64,
        filename,
        `You just sent me this ${message.type}`
      );
    }

    if(arrayOfStrings[0]=='Grupos'){
     var gru = Promise.resolve(client.getAllGroups());

      gru.then(async function(v){
        for (let i = 0; i < v.length; i++) {
          console.log(v[i].name);
        console.log(v[i].id._serialized);
        readTXT.addId('ids.txt',v[i].id._serialized+' : '+v[i].name+'\n');
          
        }
      })
      /* var users=[message.from,"5519981302441@c.us","5541987252533@c.us"];
      var ori = Promise.resolve(client.createGroup('Fórmula da Riqueza #10',users));
      ori.then(async function(v){
        console.log(v)
        var icon = await convertimg.fileToBase64('logo.jpeg')
        
         Promise.resolve(client.setGroupIcon(v.gid._serialized,icon));
        
        readTXT.addId('ids.txt',v.gid._serialized);
      })*/
    }
  });
}
