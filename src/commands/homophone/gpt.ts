import { ChatCompletionRequestMessageRoleEnum } from "openai";
import openai from "../../config/openai";

interface Options {
  quantity: number;
  language: string;
  word: string;
}

export async function get_homophones(options: Options) {
  // const prompt = `Return only a numbered list of ${quantity} unique ${language} homophones for the word ${word}`
  // const prompt2 = `Translate ${word} to ${language} then return ${quantity} unique homophones for it excluding itself. Words should be comma separated with no space`,
  const prompt3 = `Find ${options.quantity! + 1} unique ${options.language} homophones for ${options.word} and their English translations. Return only a flat JSON Object where English word is the key and the ${options.language} homophone is value `
  const prompt4 = `Find ${options.quantity! + 1} unique ${options.language} homophones for the word "${options.word}" and their English translations. There are no specific preferences for dialects, sources, or references. Return a flat JSON object where the English word is the key and the ${options.language} word is the value.`
  const message = [{
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: prompt4,
  }]
  const gpt4Messages = [
    { role: ChatCompletionRequestMessageRoleEnum.System, content: "Use your ability to translate English words into a foreign language and find homophones based on user input." },
    { role: ChatCompletionRequestMessageRoleEnum.User, content: prompt3 }
  ]
  const gpt4Messages2 = [
    { role: ChatCompletionRequestMessageRoleEnum.System, content: "Use your ability to translate English words into a foreign language and find homophones." },
    { role: ChatCompletionRequestMessageRoleEnum.User, content: `Translate ${options.word} in ${options.language}` },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Now find ${options.quantity! + 1} homophones for that translated word. Return only one flat JSON Object of the homophones and their translations. Do not return any other text`
    }
  ]

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 0,
      max_tokens: 70, 
    });
    // const response = await openai.createChatCompletion({
    //   model: "gpt-4", //need to generate a api token once I get access off of the waitlist.
    //   messages: gpt4Messages,
    //   temperature: 0,
    //   //max_tokens: 70,
    // });
    //console.log(response.data.choices[0].message!.content)
    return JSON.parse(response.data.choices[0].message!.content)
  } catch (error) {
    console.log(error)
    return null
  }  
}