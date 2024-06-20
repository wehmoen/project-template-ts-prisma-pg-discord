import {Command} from "../types.js";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder} from "discord.js";

const ButtonTestCommand: Command = {
    builder: new SlashCommandBuilder().setName("button_test").setDescription("Sends a message with a button"),
    customIdPrefix: "button_test",
    chatCommandHandler: async interaction => {
        const start = interaction.createdTimestamp
        await interaction.reply({
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .setComponents([
                        new ButtonBuilder().setLabel("Click me!").setStyle(ButtonStyle.Primary).setCustomId("button_test::click")
                    ])
            ],
            ephemeral: true
        })
    },
    componentHandler: async interaction => {
        const idParts = interaction.customId.split("::")

        switch (idParts[1]) {
            case "click":
                await interaction.reply({
                    content: "You clicked the button!",
                    ephemeral: true
                })
                break
            default:
                await interaction.reply({
                    content: "No handler found for this button: `" + interaction.customId + "`.",
                    ephemeral: true
                })
        }
    }
}

export default ButtonTestCommand