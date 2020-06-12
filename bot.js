
// setup
const {Client, RichEmbed} = require('discord.js');
const client = new Client;
const settings = require('./settings.json');

const clubs = [
  {
    name: 'tnfsh',
    reactionId: '720946074398752870',
    roleId: '694515255103062096',
  },
  {
    name: 'tngs',
    reactionId: '720946066618581033',
    roleId: '694515920143646720',
  },
  {
    name: 'skshs',
    reactionId: '720946067868221501',
    roleId: '694516158170267648',
  },
  {
    name: 'ccshs',
    reactionId: '720946066782027787',
    roleId: '694516328782102539',
  },
  {
    name: 'tivs',
    reactionId: '720946068870660158',
    roleId: '694516488484159579',
  },
  {
    name: 'shhs',
    reactionId: '720946072553259049',
    roleId: '700374295469228073',
  },
  {
    name: 'cysh',
    reactionId: '720946072305795124',
    roleId: '694516610416902255',
  },
  {
    name: 'cygsh',
    reactionId: '720946068518600754',
    roleId: '694516715270438954',
  },
  {
    name: 'cyivs',
    reactionId: '720946073086066698',
    roleId: '706128108054642749',
  },
  {
    name: 'kshs',
    reactionId: '720946073857949757',
    roleId: '694516891305246822',
  },
  {
    name: 'fshs',
    reactionId: '720946069126774856',
    roleId: '694517009941135420',
  },
  {
    name: 'kghs',
    reactionId: '720946074424180757',
    roleId: '701249228386599003',
  },
];

// startup
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('SCIST online!!'); // set status
});


// msg
client.on('message', async (msg) => {
  // new adduser : cmd : /addUserMsg
  if (msg.content.startsWith(settings.prefix + 'addUserMsg')) {
    const embed = new RichEmbed();

    embed.setTitle('選擇你的學校');
    embed.setColor(2071184);
    embed.setDescription(`哈囉！我是身分組(學校)選擇機，請選擇你的學校！
<:TNFSH:720946074398752870> => 台南一中
<:TNGS:720946066618581033> => 台南女中
<:SKSHS:720946067868221501> => 興國高中
<:CCSHS:720946066782027787> => 家齊高中
<:TIVS:720946068870660158> => 台南高工
<:SHHS:720946072553259049> => 新化高中
<:CYSH:720946072305795124> => 嘉義高中
<:CYGHS:720946068518600754> => 嘉義女中
<:CYIVS:720946073086066698> => 嘉義高工
<:KSHS:720946073857949757> => 高雄中學
<:FSHS:720946069126774856> => 鳳山高中
<:KGHS:720946074424180757> => 高雄女中
p.s.再按一次可以取消喔
一旦選擇學校請勿更換`);
    msg.channel.send(embed);
    msg.delete(0);
  }

  if (msg.author.bot) {
    if (msg.embeds) {
      const embedMsg = msg.embeds.find((msg) => msg.title === '選擇你的學校');
      if (embedMsg) {
        clubs.reduce((p, {reactionId}) => {
          return p
              .then((reaction) => reaction.message.react(reactionId))
              .catch(console.error);
        }, Promise.resolve());
      }
    }
  }
});

// addUserMsg
client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) {
    return;
  }

  const member = reaction.message
      .guild.members.find((member) => member.id === user.id);
  const rolename = reaction.emoji.id;

  clubs
      .filter(({reactionId}) => reactionId === rolename)
      .forEach(({roleId}) => {
        if (member.roles.has(roleId)) {
          member.removeRole(roleId).catch(console.error);
        } else {
          member.addRole(roleId).catch(console.error);
        }

        reaction.remove(member);
      });
});

// login using the bot's token
client.login(settings.token);
