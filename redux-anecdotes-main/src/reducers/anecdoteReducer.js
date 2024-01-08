const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const filterAtStart = ""


export const newAnecdoteAction = (content) => {
  return {
    type: "ADD_ANECDOTE",
    payload: content
  }
}

export const voteAction = (id) => {
  return {
    type: "VOTE",
    payload: { id }
  }
}

export const filterAction = (content) => {
  return {
    type: "CHANGE_FILTER",
    payload: content
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const compareVotes = (firstAnec, secondAnec) => {
  return secondAnec.votes - firstAnec.votes
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = { anecdotes: anecdotesAtStart.map(asObject), filter: filterAtStart }
console.log(initialState)

export const anecdoteReducer = (state = anecdotesAtStart.map(asObject), action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const newAnec = { ...anecdoteToVote, "votes": anecdoteToVote.votes += 1 }
      const newState = state.map(anec => anec.id !== id ? anec : newAnec)
      return newState.sort(compareVotes)
    } case "ADD_ANECDOTE": {
      return state.concat({ content: action.payload, id: getId(), votes: 0 })
    }
    default: {
      return state
    }
  }
}

export const filterReducer = (state = filterAtStart, action) => {
  switch (action.type) {
    case "CHANGE_FILTER": {
      const filter = action.payload
      console.log(state.filter)
      return { ...state, "filter": filter }
     
    }
    default:
      return state
  }
}