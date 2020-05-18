// import { create, Whatsapp } from '@open-wa/wa-automate';
const wa = require("@open-wa/wa-automate");

const readTXT = require('./lerteste');
const convertimg = require('./convertimg');

wa.create().then((client) => start(client));

var quantidade = 0;
var nome = "";
var menssage = "";

async function start(client) {
  client.onMessage(async(message) => {

    var arrayOfStrings = message.body.split("=");
    console.log(arrayOfStrings);
    

    //para criar
    if (arrayOfStrings[0] === "Criar") {
      if (quantidade <= 0) {
        client.sendText(message.from, "qual a quantidade?");
      } else if (nome == "") {
        client.sendText(message.from, "qual o nome?");
      } else {
        //client.sendText(message.from, '👋 Hello!');
        client.sendText(message.from, "Grupos criados");
        var res = await readTXT.listar();
        for (let i = 0; i < quantidade; i++) {
          if (res[0]=='') {
            var cont =0
          }
          else{
            var cont =res.length
          }
         
          let gnome = nome + " " + (i + 1+cont);
          var ori = Promise.resolve(client.createGroup(gnome, message.from));
          ori.then(async function (v) {
            var icon = await convertimg.fileToBase64('./logo.JPG')
            
            Promise.resolve(client.setGroupIcon(v.gid._serialized,icon));
            
            readTXT.addId(v.gid._serialized);
          });
        }
      }
    }

    if (arrayOfStrings[0] === "Ola") {
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
        var res = await readTXT.listar();
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
      var res = await readTXT.listar();
      client.sendText(message.from, "so adm");

      res.forEach((item)=>{
        var adm = Promise.resolve(client.setGroupToAdminsOnly(item));
            adm.then((res)=>{
              console.log(res)
            })
      })
      
    }
  });
}
