import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createTodoApi } from "../../services/api.js";

function AddTodoModal({ setRefreshList }) {
    const [todoDesc, setTodoDesc] = useState('');

    const handleTodoSubmit = async () => {
        if (todoDesc === '') {
            toast("Todo is required");
            return;
        }

        const result = await createTodoApi({ desc: todoDesc });

        if (result.status === 200 && result.data.status === 200) {
            // toast("Todo added successfully");
        } else {
            // toast(result.data.message);
        }
        // setTimeout(() => {
        // window.location.reload();
        setRefreshList();
        // }, 1000);
    }

    return (<>
        <div className='modal mt-5' id='exampleModal'>
            <ToastContainer />
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark shadow-none p-1">
                    <div className="modal-header">
                        <div className="modal-title text-secondary">Add new Todo</div>
                        <button type="button" className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="close">
                            <span arial-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <textarea name=""
                                className="form-control border border-secondary border-opacity-50 border-1 shadow-none bg-dark text-secondary"
                                rows={3}
                                value={todoDesc}
                                onChange={(e) => { setTodoDesc(e.target.value) }}
                                placeholder='write Todos....'
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn mybtn btn-danger  bg-danger text-light me-2" data-bs-dismiss="modal" onClick={() => { setTodoDesc('') }} >Close</button>
                        <button className="btn mybtn btn-primary bg-success text-light" data-bs-dismiss="modal" onClick={handleTodoSubmit} >Save Todo</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AddTodoModal;