import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const { showAlert } = props;
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  })

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, })
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle.toString(), note.edescription.toString(), note.etag.toString())
    refClose.current.click()
    showAlert("Note Updated Successfully", "warning");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] })
  }

  return (
    <>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etitle}
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    rows="3"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etag}
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && 'No Notes to display !'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
        })}
      </div>
    </>
  );
};

export default Notes;
