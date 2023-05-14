import { Client, GatewayIntentBits } from 'discord.js'
import keys from '../keys'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, //Guilds are discord servers
    GatewayIntentBits.GuildMembers,
  ]
})

client.login(keys.clientToken)
  .catch((err) => {
    console.error('[Login Error]', err)
    process.exit(1)
})