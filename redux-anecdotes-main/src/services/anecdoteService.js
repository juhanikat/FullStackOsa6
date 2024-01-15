import axios from "axios"
import { getId } from "../reducers/anecdoteReducer"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { "content": content, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const increaseVote = async (id) => {
    const anecdotes = await getAll()
    const anecdoteToVote = anecdotes.find(anec => {
        return anec.id === id
    })
    const response = await axios.put(`${baseUrl}/${id}`, {...anecdoteToVote, votes: anecdoteToVote.votes + 1})
    return response.data
}

export default {
    getAll,
    createNew,
    increaseVote
}