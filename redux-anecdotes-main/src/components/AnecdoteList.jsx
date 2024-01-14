import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationReducer"

let timeoutId = null

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter.filter === "") {
            return state.anecdotes.anecdotes
        }
        return state.anecdotes.anecdotes.filter(anec => anec.content.includes(state.filter.filter))
    })


    const handleClick = (id, content) => {
        dispatch(vote(id))
        dispatch(showNotification(`you voted "${content}"`))
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
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