const Discord = require("discord.js");
const client = new Discord.Client();

//aqui los handlers
const prefix = "!";
const data = {};
const config = {};
const debug = process.env.DEBUG == "on";

config.debugMessage = m=> {
  data.lastMessage = m;
};

client.on("message", function(message) { 
  if (debug) config.debugMessage(message);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  //TODO refactorizar el if else
  //ping
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  } else if (command === "debug" && debug) {
    if (args[0]=="eval") {
      try {
        message.reply(JSON.stringify(eval(args.slice(1).join(" "))))
      } catch(e) {
        console.error(e);
        message.reply("Error executing command. Check log for details...");
      }
    }
  }
});                                      


console.log("Token: ..."+process.env.BOT_TOKEN.slice(-10));
console.log("Degug: "+debug);
client.login(process.env.BOT_TOKEN);
