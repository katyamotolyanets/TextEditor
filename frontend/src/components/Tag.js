import React from "react";

import "./tag.css"
import deleteIcon from "../assets/deleteIcon.png"

const Tag = (props) => {
    return (
        <div className="tag-container">
            <div className="tag-form">
                <form method="POST" onSubmit={(e) => props.handleSubmitCreateTag(e)}>
                    <input type="text" name="tag" placeholder="Create your tag!"
                        className="create-field"/>
                    <button type="submit" className="add-button">Add</button>
                </form>
            </div>
            <p>Choose tag to filter notes</p>
            <div className="reset-notes-button">
                <button onClick={() => props.handleClickReset()}>Reset</button>
            </div>
            <div className="tag-filter">
                <ul className="tag-list">
                    {props.tags?.map(tag => {
                        return (
                            <li>
                                <div className="tag-list-item">
                                    <button onClick={() => props.handleClickFilter(tag.id)}
                                        className="tag-name-button">{tag.name}</button>
                                    <button onClick={() => props.handleClickDelete("tag", tag.id)}
                                            className="delete-tag-button">
                                        <img className="button-icon" src={deleteIcon}/>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Tag;