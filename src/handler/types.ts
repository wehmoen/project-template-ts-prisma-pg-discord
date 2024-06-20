import {
    AutocompleteInteraction, ChatInputCommandInteraction, MessageComponentInteraction, ModalSubmitInteraction,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

type CommandBuilder = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder  | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder

export type Command = {
    builder: CommandBuilder,
    customIdPrefix?: string,
    autoCompleteHandler?: (interaction: AutocompleteInteraction) => Promise<void>,
    modalSubmitHandler?: (interaction: ModalSubmitInteraction) => Promise<void>,
    componentHandler?: (interaction: MessageComponentInteraction) => Promise<void>,
    chatCommandHandler?: (interaction: ChatInputCommandInteraction) => Promise<void>
}