export default function breed(state = '', action) {
  switch(action.type) {
    // breed change => clear animal with previous breed
    case 'CHANGE_BREED':
      return action.payload
    case 'CHANGE_ANIMAL':
      return ''
    default:
      return state
  }
}