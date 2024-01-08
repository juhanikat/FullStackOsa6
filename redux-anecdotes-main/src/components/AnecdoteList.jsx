import { useDispatch, useSelector } from "react-redux"
import { voteAction } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter.filter === "") {
            return state.anecdotes
        }
        return state.anecdotes.filter(anec => anec.content.includes(state.filter.filter))
    })


    const vote = (id) => {
        dispatch(voteAction(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList