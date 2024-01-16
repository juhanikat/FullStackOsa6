import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter.filter === "") {
            return state.anecdotes.anecdotes
        }
        return state.anecdotes.anecdotes.filter(anec => anec.content.includes(state.filter.filter))
    })


    const handleClick = (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You voted "${content}"`, 5))
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
                        <button onClick={() => handleClick(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList