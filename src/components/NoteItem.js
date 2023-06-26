import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-header">{note.tag}</div>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h6 className="card-title">{note.title}</h6>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Note Deleted Successfully", "danger");
              }}
            ></i>
            <i className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
