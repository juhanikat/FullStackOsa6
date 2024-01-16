import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"


export const getId = () => (100000 * Math.random()).toFixed(0)

const compareVotes = (firstAnec, secondAnec) => {
  return secondAnec.votes - firstAnec.votes
}

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: { anecdotes: [] },
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.anecdotes.find(a => a.id === id)
      const newAnec = { ...anecdoteToVote, "votes": anecdoteToVote.votes += 1 }
      const changedAnecdotes = state.anecdotes.map(anec => anec.id !== id ? anec : newAnec)
      changedAnecdotes.sort(compareVotes)
      state.anecdotes = changedAnecdotes
    },
    addAnecdote(state, action) {
      state.anecdotes.push(action.payload)

    },
    setAnecdotes(state, action) {
      return { anecdotes: action.payload }
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.increaseVote(id)
    dispatch(vote(id))

  }
}

export default anecdoteSlice.reducer
