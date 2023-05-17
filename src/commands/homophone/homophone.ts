import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";
import { formatResponse } from './utils';
import { get_homophones } from './gpt'
import { createNarration } from './tts'
import { Language } from "./types";

const meta = new SlashCommandBuilder()
  .setName('homophone')
  .setDescription('Selects homophones in a different language for a specified English word')
  .addStringOption((option) =>
    option
      .setName('word')
      .setDescription('Provide the bot a word to find homophones for')
      .setMinLength(1)
      .setMaxLength(15)
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('language')
      .setDescription('Select a language to find homophones for')
      .setChoices({ name: 'Spanish', value: 'Spanish'}, {name: 'French', value: 'French'}, {name: 'Chinese', value: 'Chinese'})
      .setMinLength(1)
      .setMaxLength(15)
      .setRequired(true)
  )
  .addIntegerOption((option) => 
    option
      .setName('quantity')
      .setMinValue(1)
      .setMaxValue(5)
      .setRequired(true)
      .setDescription('Select the number of homophones you would like to see')
  )

export default command(meta, async ({ interaction }) => {
  const options = {
    word: interaction.options.getString('word')!,
    language: interaction.options.getString('language')! as Language,
    quantity: interaction.options.getInteger('quantity')!
  }
  await interaction.deferReply({ ephemeral: false })
  const homophones = await get_homophones(options)
  console.log(homophones)
  const audioFilePath = await createNarration(homophones, options.language)
  
  const res = formatResponse(homophones)
  console.log(res)

  
  return interaction.editReply({
    // ephemeral: true,
    content: res ?? 'Error, answer not found',
    files: [{ attachment: audioFilePath }],
  })
})