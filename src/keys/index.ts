import { Keys } from '../types'

const keys: Keys = {
  clientToken: process.env.CLIENT_TOKEN ?? 'nil',
  testGuild: process.env.TEST_GUILD ?? 'nil'
}

if (Object.values(keys).includes('nil'))
  throw new Error("Not all env variables are defined!")

export default keys