import {Client, GatewayIntentBits, Events} from "discord.js";
import {ensureCommands, handleInteraction} from "./handler/index.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
})

client.once(Events.ClientReady, async (client: Client<true>) => {
    console.log(`[Client] Logged in as ${client.user?.tag} (${client.user?.id})`)
    const guilds = await client.guilds.fetch()
    console.log(`[Client] Connected to ${guilds.size} guilds`)

    await ensureCommands(client)
})

client.on(Events.Error, console.error)

client.on(Events.InteractionCreate, async interaction => {
    await handleInteraction(interaction)
})

client.login(process.env.DISCORD_TOKEN).catch(console.error)