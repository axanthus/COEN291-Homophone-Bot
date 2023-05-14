import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";
import openai from "../../config/openai";


const meta = new SlashCommandBuilder()
  .setName('advice')
  .setDescription('Provides advice for any situation')
  .addStringOption((option) =>
    option
      .setName('situation')
      .setDescription('Provide the bot a situation to respond with')
      .setMinLength(1)
      .setMaxLength(200)
      .setRequired(true) // must use this option for /advice to work.
  )

export default command(meta, async ({ interaction }) => {
  const situation = interaction.options.getString('situation')

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: situation,
    temperature: 0.8,
    max_tokens: 20,
  });

  console.log(response.data)

  return interaction.reply({
    ephemeral: true, //means that the reply will not be a direct message, will be private in the channel
    content: response.data.choices[0].text ?? 'Error, answer not found'
  })
})