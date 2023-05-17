import tts from '@google-cloud/text-to-speech'
import fs from 'fs'
import util from 'util'
import uniqueFn from 'unique-filename'
import { formatSSML } from './utils'
import { Language } from './types'

const client = new tts.TextToSpeechClient() //no need for api key

//test func for api

export async function createNarration(homophones:any, language: Language) { //createNarration
  
  const ssmlText = formatSSML(homophones, language)
  const samplessmlText = `
    <speak>
        The Input word is: bread. <break time="500ms"/>
        How to say the word "bread" in French: <break time="1000ms"/> 
        <voice  name="fr-FR-Neural2-E"> 
          Pain.
        </voice> <break time="1000ms"/>
        How to say the word "painted" in French: <break time="1000ms"/>
        <voice  name="fr-FR-Neural2-E"> 
          peint.
        </voice> <break time="1000ms"/>
        How to say the word "thinks" in French: <break time="1000ms"/>
        <voice  name="fr-FR-Neural2-E"> 
          pense.
        </voice> <break time="1000ms"/>
        How to say the word "pines" in French: <break time="1000ms"/>
        <voice  name="fr-FR-Neural2-E"> 
          pins.
        </voice> 
    </speak>`;

  
  // Construct the request
  const request = {
    input: {ssml: ssmlText},
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: 'en-US', name:'en-US-Neural2-J', ssmlGender: 'MALE'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  const outputFilePath = uniqueFn('./src/audio/', 'output').concat('.mp3')
  console.log(outputFilePath)
  await writeFile(outputFilePath, response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');

  return outputFilePath
}
