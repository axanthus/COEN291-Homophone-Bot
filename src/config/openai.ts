import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

if (!configuration.apiKey) throw new Error("No api key for openai")

const openai = new OpenAIApi(configuration)

export default openai