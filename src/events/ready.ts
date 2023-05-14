import { event } from '../utils'

//exporting the call of the function event which returns id and exec
export default event('ready', ({ log }, client) => {
  log(`Logged in as ${client.user.tag}`)
})