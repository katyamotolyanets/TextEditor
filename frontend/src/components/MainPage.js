import React, {useEffect, useState} from 'react';
import axios from "axios";
import cloneDeep from 'lodash/cloneDeep';

import updateNotes from "../services/note.service";
import Note from "./Note";
import Tag from "./Tag";
import "./main-page.css"

import URL from "../config"

const MainPage = () => {
    let [notes, setNotes] = useState([]);
    let [tags, setTags] = useState([]);
    const [currentUpdate, setCurrentUpdate] = useState({})
    const [isUpdateClicked, setUpdateClicked] = useState(false)
    const firstStateOfCurrentUpdate = cloneDeep(currentUpdate)
    let [filteredNotes, setFilteredNotes] = useState([])
    let allTags = tags.map(tag => tag.name)
    let lastNoteID = notes?.map(note => note.id).pop()
    if (lastNoteID == null)
        lastNoteID = 0
    let lastTagID = tags?.map(tag => tag.id).pop()
    if (lastTagID == null)
        lastTagID = 0

    useEffect(async () => {
        await axios({
            method: 'GET',
            url: URL,
        }).then(response => {
            setNotes(response.data.notes)
            setTags(response.data.tags)
            setFilteredNotes(response.data.notes)
        }).catch(err =>
            console.log(err)
        )
    }, [])

    const handleSubmitCreateNote = (event) => {
        event.preventDefault();
        const newNote = event.target.note.value;
        notes = [...notes, {id: lastNoteID + 1, note: newNote}]
        const parseNoteForTags = newNote.split(" ")
            .filter(word => {
                return word.startsWith("#")
            })
        parseNoteForTags.forEach(tag => {
            if (!allTags.includes(tag.substring(1)) && tag.substring(1) !== "") {
                tags = [...tags, {id: lastTagID + 1, name: tag.substring(1)}]
                lastTagID++
            }
        })
        updateNotes(notes, tags)
            .then(response => {
                setNotes(response.data.notes)
                setTags(response.data.tags)
                setFilteredNotes(response.data.notes)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleClickFilter = (id) => {
        let notesWithTag = []
        if (tags.find(tag => tag.id === id)) {
            const tag = tags.find(t => t.id === id)
            notesWithTag = notes.filter(note => {
                return note.note.split(" ")
                    .filter(word => word.startsWith("#"))
                    .find(word => word.substring(1) === tag.name)
            })
            setFilteredNotes(notesWithTag)
        } else {
            setFilteredNotes([])
        }
    }

    const handleClickReset = () => {
        setFilteredNotes(notes)
    }

    const handleSubmitCreateTag = (event) => {
        event.preventDefault();
        const newTag = event.target.tag.value;
        if (!tags.find(tag => tag.name === newTag)) {
            tags = [...tags, {id: lastTagID + 1, name: newTag}]
            updateNotes(notes, tags)
                .then(response => {
                    setNotes(response.data.notes)
                    setTags(response.data.tags)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const handleClickDelete = (item, id) => {
        let updatedTags = tags
        let updatedNotes = notes;
        if (item === "tag") {
            updatedTags = tags.filter((tag) => tag.id !== id)
        } else if (item === "note") {
            updatedNotes = notes.filter((note) => note.id !== id)
        }
        updateNotes(updatedNotes, updatedTags)
            .then(response => {
                setNotes(response.data.notes)
                setTags(response.data.tags)
                setFilteredNotes(response.data.notes)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleClickUpdate = (id) => {
        setCurrentUpdate(notes.find((note) => note.id === id))
        setUpdateClicked(true)
    }

    const handleSubmitUpdate = (event) => {
        const idOfCurrentUpdate = notes.indexOf(notes.find(note => note.id === currentUpdate.id))
        if (event.currentTarget.value === "save") {
            let parseNoteForTags = currentUpdate.note.split(" ")
                .filter(word => {
                    return word.includes("#")
                })
            const tagsWithoutDuplicates = new Set(parseNoteForTags)
            parseNoteForTags = [...tagsWithoutDuplicates]
            parseNoteForTags.forEach(tag => {
                if (!allTags.includes(tag.substring(1)) && tag.substring(1) !== "") {
                    tags = [...tags, {id: lastTagID + 1, name: tag.substring(1)}]
                    lastTagID++
                }
            })
            notes[idOfCurrentUpdate] = currentUpdate;
            updateNotes(notes, tags)
                .then(response => {
                    setNotes(response.data.notes)
                    setTags(response.data.tags)
                    setFilteredNotes(response.data.notes)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            notes[idOfCurrentUpdate] = firstStateOfCurrentUpdate;
        }
        setCurrentUpdate({})
        setUpdateClicked(false)
    }

    const onChangeInput = (value) => {
        currentUpdate.note = value
    }

    return (
        <div className="main-container">
            <div className="tags">
                <Tag tags={tags} handleClickDelete={handleClickDelete} handleSubmitCreateTag={handleSubmitCreateTag}
                     handleClickFilter={handleClickFilter} handleClickReset={handleClickReset}/>
            </div>
            <div className="notes">
                <form method="POST" onSubmit={handleSubmitCreateNote} className="create-note-form">
                    <textarea type="text" name="note" placeholder="Type your note!" className="create-note-field"/>
                    <button type="submit" className="add-button">Add</button>
                </form>
                <div>
                    <Note notes={filteredNotes} handleClickDelete={handleClickDelete}
                          handleClickUpdate={handleClickUpdate}
                          currentUpdate={currentUpdate} handleSubmitUpdate={handleSubmitUpdate}
                          onChangeInput={onChangeInput} isUpdateClicked={isUpdateClicked}/>
                </div>
            </div>
        </div>
    )
}

export default MainPage;