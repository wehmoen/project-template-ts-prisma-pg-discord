import {Command} from "./types.js";
import {
    Client,
    Interaction,
    MessageComponentInteraction,
    ModalSubmitInteraction,
    SlashCommandBuilder
} from "discord.js";

import pingCommand from './commands/ping.js'

const commands: Command[] = [
    pingCommand
]

export async function ensureCommands(client: Client<true>) {
    const applicationCommands = await client.application?.commands.fetch()
    for (const command of commands) {
        const existingCommand = applicationCommands?.find(c => c.name === command.builder.name)
        if (!existingCommand) {
            const createdCommand = await client.application?.commands.create(command.builder as SlashCommandBuilder)
            console.log(`[Commands] Created command ${createdCommand.name} with id ${createdCommand.id}`)
        } else {
            await client.application?.commands.edit(existingCommand.id, command.builder)
        }
    }
}

export async function handleInteraction(interaction: Interaction) {

    if (!interaction.isAutocomplete() && !interaction.isModalSubmit() && !interaction.isMessageComponent() && !interaction.isChatInputCommand()) {
        return
    }

    if (interaction.isChatInputCommand()) {
        const command = commands.find(c => c.builder.name === interaction.commandName)
        if (command && command.chatCommandHandler) {
            await command.chatCommandHandler(interaction)
        }
        return
    }

    if (interaction.isAutocomplete()) {
        const command = commands.find(c => c.builder.name === interaction.commandName)
        if (command && command.autoCompleteHandler) {
            await command.autoCompleteHandler(interaction)
        }
        return
    }

    const idParts = interaction.customId.split("::")
    const command = commands.find(c => c.customIdPrefix === idParts[0])
    if (interaction.isModalSubmit()) {
        if (command && command.modalSubmitHandler) {
            await command.modalSubmitHandler(interaction)
        }
        return
    }

    if (interaction.isMessageComponent()) {
        if (command && command.componentHandler) {
            await command.componentHandler(interaction as MessageComponentInteraction)
        }
        return
    }

}
