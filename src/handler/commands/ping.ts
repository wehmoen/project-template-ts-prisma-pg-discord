import {Command} from "../types.js";
import {EmbedBuilder, SlashCommandBuilder} from "discord.js";

const PingCommand: Command = {
    builder: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    chatCommandHandler: async interaction => {
        const start = interaction.createdTimestamp
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Pong!")
                    .setDescription(`Latency is ${Date.now() - start}ms.`)
                    .setTimestamp()
                    .setColor("Random")
            ],
            ephemeral: true
        })
    }
}

export default PingCommand