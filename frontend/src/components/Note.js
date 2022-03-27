import Highlighter from "react-highlight-words";

const Note = (props) => {
    return (
        <div className="note-container">
            <table className="table">
                <tbody>
                {props.notes?.map(note => {
                        return (
                            <tr>
                                <td>{
                                    (props.currentUpdate.id === note.id) ?
                                        <div contentEditable={true}
                                             style={{border: '1px solid black'}}
                                             onInput={(e) => {
                                                 props.onChangeInput(e.currentTarget.textContent)
                                             }}>
                                            <Highlighter searchWords={note.note.split(" ")
                                                .filter(word => {
                                                        return word.startsWith("#")
                                                    }
                                                )}
                                                         autoEscape={true}
                                                         textToHighlight={note.note}

                                            />
                                        </div> :
                                        <div>
                                            {note.note}
                                        </div>
                                }
                                </td>
                                <td>
                                    <button onClick={() => props.handleClickDelete("note", note.id)}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={() => props.handleClickUpdate(note.id)}>Update</button>
                                </td>
                                <td>
                                    <button value="save" onClick={(e) => {
                                        props.handleSubmitUpdate(e)
                                    }}>Save
                                    </button>
                                </td>
                                <td>
                                    <button value="cancel" onClick={(e) => {
                                        props.handleSubmitUpdate(e)
                                    }}>Cancel
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Note;
