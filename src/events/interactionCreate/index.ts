import { Event } from '../../types'
import commands from './commands'
// & list of events to listen for and log
const events: Event<any>[] = [
  commands,
]

export default events