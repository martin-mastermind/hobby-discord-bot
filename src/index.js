const { Client, Intents, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");

console.log(GatewayIntentBits);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, GatewayIntentBits.Guilds ] });

client.on('ready', () => {
  client.user.setActivity("Смотрим главную котейку сервера", {
    type: "STREAMING",
    url: "https://www.twitch.tv/thevenustv"
  });

  console.log('I am ready!');
});

const voice_messages = {
  '!чаечка': './locker/bird.mp3',
  '!очередняра': './locker/papich.mp3',
  '!кловн': './locker/clowns.mp3',
  '!дудос': './locker/dudos.mp3',
  '!осуждение': './locker/osujdenie.mp3',
  '!сын': './locker/sun.mp3',
  '!жри': './locker/zri.mp3',
  '!охуенно': './locker/ohuenno.mp3',
  '!блядь': './locker/blyadina.mp3',
  '!легко': './locker/papich-1.mp3',
  '!падла': './locker/mulder-1.mp3',
  '!тебя': './locker/mashesh.mp3',
  '!заезжаем': './locker/zaezd.mp3',
  '!хуета': './locker/hueta.mp3',
  '!ульта': './locker/ultanula.mp3',
  '!пидорас': './locker/pedik.mp3',
  '!ши': './locker/siu.mp3',
  '!шишки': './locker/shishki.mp3',
  '!рыба': './locker/riba.mp3',
  '!сосать': './locker/sosat.mp3',
  '!секс': './locker/seks-2.mp3'
};

const voiceSender = (message, music_file) => {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return;
  }

  const player = createAudioPlayer();
  const resource = createAudioResource(music_file);

  const connection = joinVoiceChannel({
    channelId: voiceChannel,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator
  });

  console.log(connection);

  /*const subscription = connection.subscribe(player);
  player.play(resource);

  player.on(AudioPlayerStatus.Idle, () => {
    player.stop();
    subscription.unsubscribe();
    connection.destroy();
  });*/
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (Object.keys(voice_messages).includes(message.content)) {
    voiceSender(message, voice_messages[message.content]);
    return;
  }

  if (message.content.toLowerCase().startsWith("почему")) {
    voiceSender(message, './locker/potomu.mp3');
    return;
  }

  if (Math.random() > 0.96) {
    voiceSender(message, './locker/dolboeb.mp3');
  }
});

client.login(process.env.DISCORD_BOT);