const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = ",";

//Demarrage / activité du bot
 
bot.on("ready", () => {
    console.log("Je suis prêt !");//regarder le debug console
    let statuss = [
    (bot.users.size)+ ' sans fiche !',//regarder le statuts du bot
      ",help",
      "Demander a Noire Neige pour m'utiliser",
      "Ma créatrice c'est Noire Neige",
    ]
   
    setInterval(function () {
      let status = statuss[Math.floor(Math.random() * statuss.length)];
      bot.user.setActivity(status, { type: 0 });//change le statuts tous le X temps
   
    }, 4000);
});

bot.login(process.env.TOKEN);

bot.on('guildMemberAdd', member => {
  const welcomechannel = member.guild.channels.find('id', '536811661814792192')//channel #arrivé
    var embed = new Discord.RichEmbed()
    .setColor('#76D880')
    .setDescription(`:inbox_tray: <@${member.user.id}> Bienvenue a toi !!`)//s'houaite la bienvenue
    return welcomechannel.send({embed})
    
    });

bot.on('guildMemberRemove', member => {

     const welcomechannel = member.guild.channels.find('id', '536811661814792192')//channel #arrivé
     var embed = new Discord.RichEmbed()
     .setColor('#FF0000')
     .setDescription(`:inbox_tray: <@${member.user.id}>nous a quitté !! `)//dit aurevoir
      return welcomechannel.send({embed})
        
     });

     bot.on('guildMemberAdd', member => {
        var role = member.guild.roles.find('name', 'sans fiche');
        member.addRole(555449622982819906)//role sans fiche
    });

bot.on('message', message =>{
    if (message.content === prefix + "ping"){
        message.reply("pong");//drole
        console.log('ping pong');
    }
    
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#FF0000')
            .addField("Commandes du bot !", "  -,help : Affiche les commandes du bot !")
            .addField("Commandes du bot !","   -, : pour utiliser les commandes !")
            .addField("Interaction", "ping : Le bot répond pong !")
            .addField("commandes modération", "say + message")
            .addField("commandes modération", "ban + pseudo")
            .setFooter("C'est tout pour ce embed !")
        message.channel.sendEmbed(help_embed);
        //message.channel.sendMessage("Voici les commendes du bot :\n -,help pour afficher les commandes");
        console.log("Commande Help demandée !");
        }  
});

bot.on('message', message => {

    var cont = message.content;

    if(cont.startsWith(prefix + "say")) {
         message.delete(100); //le message se retire au bout de 1 seconde
         message.channel.send(message.content.slice(4, message.content.lenght)); //il reprend le msg de l'auteur pour le mettre dans le channel, sauf que là c'est lui qui parlera
         console.log("Say" + message.author.username) //pour voir qui a say
    }
});

bot.on('message', message => {
    let command = message.content.split(" ")[10];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "ban") {
        let modRole = message.guild.roles.find("name", "kilaire", "de-maniaque");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        const member = message.mentions.member.first();
        if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
        member.ban().then(message => {
            message.reply(`${member.user.username} a été banni avec succès.`).catch(console.error);
            message.guild.channels.find("name", "général").send(`**${member.user.username}** a été bani du discord par **${message.author.username}**`)
        }).catch(console.error)
}})
