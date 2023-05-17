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
  const prompt3 = `Find ${options.quantity! + 1} unique ${options.language} homophones for ${options.word} and their English translations. Return only a JSON Object where English translation is key and ${options.language} homophone is value `
  const message = [{
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: prompt3,
  }]

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: message,
    temperature: 0.1,
    max_tokens: 70,
  });

  return JSON.parse(response.data.choices[0].message!.content)
}