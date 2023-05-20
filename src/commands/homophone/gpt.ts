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
  const prompt3 = `Find ${options.quantity + 1} unique ${options.language} homophones for ${options.word} and their English translations. Return only a flat JSON Object where English word is the key and the ${options.language} homophone is value `
  const prompt4 = `Find ${options.quantity + 1} unique ${options.language} homophones for the word "${options.word}" and their English translations. There are no specific preferences for dialects, sources, or references. Return a flat JSON object where the English word is the key and the ${options.language} word is the value. 
  The first entry in the JSON Object should be ${options.language} translation of ${options.word} as the key and ${options.word} as the value. 
  The rest of the entries should follow this format: "${options.language} homophone word": "translated English word".                  
  JSON Object Example:{
                      "${options.language} translation of ${options.word}": "${options.word}",
                      "${options.language} homophone word": "translated English word",
                      "${options.language} homophone word": "translated English word",
                      ...
                    }

                    Please note that the JSON object should contain no arrays. Ensure that the English words correspond correctly to the translated homophones and that there are ${options.quantity + 1} entries in the JSON Object.`
  
  const prompt5 = `Find ${options.quantity + 1} unique ${options.language} homophones for ${options.word} and their English translations. Output the results in a flat JSON object format, where the English translations are the keys and the corresponding ${options.language} homophones are the values. The JSON Object should contain no arrays.
  Here is an example: The word is 'bread', the language to translate to is French, and the number of homophones to return is 3. 
  So the return JSON Object could be { "bread": "pain", "pine": "pin", "painted": "peint" }. The format of the JSON Object should be "English word" : "translated ${options.language} homophone word". Do not mix up the languages!`
  
  const prompt6 = `Generate a flat JSON object containing ${options.quantity + 1} unique ${options.language} homophones for the word "${options.word}" 
                    and their English translations. The JSON object should follow the format "${options.language} homophone word": "translated English word".
                    JSON Object Example:
                    {
                      "${options.language} homophone word": "translated English word",
                      "${options.language} homophone word": "translated English word",
                      ...
                    }

                    Please note that the JSON object should contain no arrays. Ensure that the English words correspond correctly to the translated homophones and that there are ${options.quantity + 1} entries in the JSON Object.
                  `

  const message = [{
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: prompt4,
  }]
  const gpt4Messages = [
    { role: ChatCompletionRequestMessageRoleEnum.System, content: "Use your ability to translate English words into a foreign language and find homophones based on user input." },
    { role: ChatCompletionRequestMessageRoleEnum.User, content: prompt6 }
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
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: prompt6,
    //   temperature: 0,
    //   max_tokens: 100, 
    // });
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