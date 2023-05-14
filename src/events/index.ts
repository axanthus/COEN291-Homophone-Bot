import { Event } from '../types'
import ready from './ready'

// & list of events to listen for and log
const events: Event<any>[] = [
  ready, //ready event
]

export default events
