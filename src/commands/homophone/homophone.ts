import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";
import openai from "../../config/openai";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

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
      .setChoices({ name: 'Spanish', value: 'Spanish'}, {name: 'French', value: 'French'})
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
  const word = interaction.options.getString('word')
  const language = interaction.options.getString('language')
  const quantity = interaction.options.getInteger('quantity')

  // const prompt = `Return only a numbered list of ${quantity} unique ${language} homophones for the word ${word}`
  // const prompt2 = [{
  //   role: ChatCompletionRequestMessageRoleEnum.User,
  //   content: `Translate ${word} to ${language} then return ${quantity} unique homophones for it excluding itself. Words should be comma separated with no space`,
  // }]
  const prompt3 = [{
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: `Find ${quantity! + 1} unique ${language} homophones for ${word} and their English translations. Return only a JSON Object where English translation is key and ${language} homophone is value `,
  }]

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt3,
    temperature: 0.1,
    max_tokens: 70,
  });

  const homophones = JSON.parse(response.data.choices[0].message!.content)
  console.log(homophones)
  let res = ""
  let i = 0
  for (const foreignWord in homophones) {
    if (i === 0) {
      res = res.concat(`Input Word: ${homophones[foreignWord]} => ${foreignWord} \n\nHomophones:\n\n`)
    }
    else
      res = res.concat(`${i}. ${homophones[foreignWord]} : ${foreignWord}\n`)
    
    i+=1
  }

  console.log(res)

  //audio will say "How to say word in French: Pan, how to say word in French: Pan, sounds funny that way"

  return interaction.reply({
    ephemeral: true,
    content: res ?? 'Error, answer not found'
  })


  // return interaction.reply({
  //   ephemeral: true,
  //   content: "stuff" ?? 'Error, answer not found',
  //   files: [{ attachment: "src/audio/house-dreamy.mp3" }],
  // })
})