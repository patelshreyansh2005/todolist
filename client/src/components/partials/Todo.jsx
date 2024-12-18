import React from 'react'
import moment from 'moment/moment'
import { deleteTodoApi, markTodoApi } from '../../services/api.js';
import { toast } from "react-toastify";

function Todo({ todo, setRefreshList }) {

    const handleDelete = async () => {
        const result = await deleteTodoApi({
            todo_id: todo._id,
        });
        if (result.data.stateCode === 200) {
            toast('Deleted');
        } else {
            // toast('Failed to delete');
        }
        setRefreshList(new Date());
    }

    const handleMarkTodo = async () => {
        const result = await markTodoApi({
            todo_id: todo._id,
        });
        if (result.data.stateCode === 200) {
            toast(result.data.message);
        } else {
            // toast('Failed to mark todo');
        }
        setRefreshList(new Date());

    }

    return (
        <div className='col-sm-3 mx-3 my-2 alert bg-dark shadow-none overflow-hidden'>
            <div className="card-header">
                {todo.isCompleted ? <div className='text-success'>Completed</div> : <div className='text-warning'>Not Completed</div>}
            </div>
            <div className="card-body">
                <h4 className='card-title text-light my-2'>{todo.desc}</h4>
                <p className='card-text mb-2'>{moment(todo.date).fromNow()}</p>
            </div>

            <div className="actionButtons" style={{
                display: 'flex', justifyContent: 'space-between', alignItems:
                    "center"
            }}>
                <div className="deleteButton btn btn-outline-danger mybtn">
                    <div onClick={handleDelete} >Delete</div>
                </div>
                <div className="markTodo btn btn-outline-success mybtn">
                    <div onClick={handleMarkTodo} >{todo.isCompleted ? 'Mark Uncomplete' : 'MarkComplete'}</div>
                </div >
            </ div>
        </div>
    );
}

export default Todo