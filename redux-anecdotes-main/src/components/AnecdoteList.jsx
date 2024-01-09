import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        console.log(state.anecdotes)
        if (state.filter === "") {
            return state.anecdotes
        }
        return state.anecdotes.filter(anec => anec.content.includes(state.filter.filter))
    })


    const handleClick = (id) => {
        dispatch(vote(id))
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
                        <button onClick={() => handleClick(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList