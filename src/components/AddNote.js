import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const { showAlert } = props;
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "General" })

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title.toString(), note.description.toString(), note.tag.toString());
    setNote({ title: "", description: "", tag: "" })
    showAlert("Note Added Successfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] })
  }

  return (
    <div className="container py-2">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-lg-9 col-xl-8">
          <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4 p-md-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5" style={{ color: 'green' }}>Add Note</h3>
              <form onSubmit={handleClick}>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="title" name="title" placeholder="Enter Title" className="form-control form-control-lg" minLength={3} maxLength={30} value={note.title} onChange={onChange} required />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="tag" name="tag" placeholder="Enter Tag" className="form-control form-control-lg" value={note.tag} maxLength={20} onChange={onChange} />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div className="form-outline">
                    <textarea type="text" id="description" name="description" placeholder="Enter Description" className="form-control form-control-lg" minLength={3} value={note.description} onChange={onChange} required />
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button className="btn btn-outline-success btn-lg" type="submit" value="Save Note" >Save Note</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddNote;
