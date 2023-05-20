import { Language, VoiceName } from './types';
export const formatResponse = (homophones: any) => {
  let res = ""
  let i = 0
  for (const foreignWord in homophones) {
    if (i === 0) {
      res = res.concat(`Input Word: ${homophones[foreignWord]} => ${foreignWord} \n\nHomophones:\n\n`)
    }
    else
      res = res.concat(`${i}. ${homophones[foreignWord]} : ${foreignWord}\n`)
    
    i += 1
  }
  return res
}



export const formatSSML = (homophones: any, language: Language) => {

  let voiceName: VoiceName

  switch (language) {
    case 'Spanish':
      voiceName = 'es-ES-Standard-A'
      break;
    case 'French':
      voiceName = 'fr-FR-Standard-C'
      break;
    case 'Chinese':
      voiceName = 'yue-HK-Standard-B'
      break;
    case 'Greek':
      voiceName = 'el-GR-Standard-A'
      break;
    default:
      voiceName = 'en-US-News-M'
      break;
  }

  const wordBlock = (voiceName: VoiceName, language: Language, eWord: string, fWord: string) => `
        How to say the word "${eWord}" in ${language}: <break time="1000ms"/> 
        <voice  name="${voiceName}"> 
          ${fWord}.
        </voice> <break time="1000ms"/>`
  
  let res = ""
  let i = 0
  for (const foreignWord in homophones) {
    if (i === 0) {
      res = res.concat(`<speak>The Input word is: ${homophones[foreignWord]}. <break time="500ms"/>`)
      res = res.concat(wordBlock(voiceName, language, homophones[foreignWord], foreignWord))
    }
    else
      res = res.concat(wordBlock(voiceName, language, homophones[foreignWord], foreignWord))
    
    i += 1
  }
  res = res.concat('</speak>')
  console.log(res)

  return res
}