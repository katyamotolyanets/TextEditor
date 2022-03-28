import Highlighter from "react-highlight-words";

import "../styles/note.css"
import deleteIcon from "../assets/deleteIcon.png"
import cancelIcon from "../assets/cancelIcon.png"
import submitIcon from "../assets/submitIcon.png"

const Note = (props) => {
    return (
        <div className="note-container">
            <table className="table">
                <tbody>
                {props.notes?.map(note => {
                        return (
                            <tr className="note-item">
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
                                                         highlightStyle={{backgroundColor: '#66CDAA'}}
                                            />
                                        </div> :
                                        <div>
                                            {note.note}
                                        </div>
                                }
                                </td>
                                <td className="td">
                                    <button onClick={() => props.handleClickDelete("note", note.id)}
                                            className="delete-note-button">
                                        <img src={deleteIcon} className="button-icon"/>
                                    </button>
                                </td>
                                {
                                    !props.isUpdateClicked ?
                                        <td>
                                            <button onClick={() => props.handleClickUpdate(note.id)}
                                                    className="update-note-button">Update
                                            </button>
                                        </td> :
                                        ""
                                }
                                {
                                    props.isUpdateClicked ?
                                        <td>
                                            <button value="save"
                                                    onClick={(e) => {
                                                        props.handleSubmitUpdate(e)
                                                    }}
                                                    className="save-button">
                                                <img src={submitIcon} className="button-icon"/>
                                            </button>
                                        </td> :
                                        ""
                                }
                                {
                                    props.isUpdateClicked ?
                                        <td>
                                            <button value="cancel"
                                                    onClick={(e) => {
                                                        props.handleSubmitUpdate(e)
                                                    }}
                                                    className="cancel-button">
                                                <img src={cancelIcon} className="button-icon"/>
                                            </button>
                                        </td> :
                                        ""
                                }
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
