import { Event } from '../types'
import ready from './ready'
import interactionCreate from './interactionCreate'
// & list of events to listen for and log
const events: Event<any>[] = [
  ...interactionCreate,
  ready, //ready event
]

export default events
