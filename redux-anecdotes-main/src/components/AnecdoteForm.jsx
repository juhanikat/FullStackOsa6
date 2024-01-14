import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdoteService"


let timeoutId = null

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        anecdoteService.createNew(content).then(response => {
        dispatch(addAnecdote(content))
        })
        dispatch(showNotification(`You added "${content}"`))
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
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm