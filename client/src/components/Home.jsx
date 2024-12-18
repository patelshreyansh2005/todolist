import React, { useEffect } from 'react';
import Header from './partials/Header.jsx';
import { useNavigate } from 'react-router-dom';
import Todo from './partials/Todo.jsx';
import AddTodoModal from './partials/AddTodoModal.jsx';
import { getTodolistApi, getToken } from '../services/api.js';
import { useState } from 'react';
import { ToastContainer } from "react-toastify";

function Home() {

    const navigation = useNavigate();
    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [refreshList, setRefreshList] = useState([]);

    useEffect(() => {
        if (!getToken()) {
            navigation('/login');
        }
        fecthTodoList();
    }, [navigation, refreshList]);

    useEffect(() => {
        if (searchText === '') {
            setFilteredList(list);
        } else {
            const filteredList = list.filter(todo => todo.desc.toLowerCase().includes(searchText.trim()));
            setFilteredList(filteredList);
        }
    }, [list, searchText]);

    async function fecthTodoList() {
        const result = await getTodolistApi();
        if (result.status === 200 && result.data.statusCode === 200) {
            setList(result.data.data.todos);
        }
    }
    return (<>
        <Header searchText={searchText} setSearchText={setSearchText} />
        <ToastContainer />
        <div className="container mt-3 pt-5">
            <div className="row justify-contant-md-center mt-4">
                {
                    filteredList.map((todo) => <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList} />)
                }
                {
                    filteredList.length === 0 && <div className="notFoundTodos">
                        No Todos Found
                    </div>
                }
            </div>
        </div>
        <div className="" style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
            <button type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-outline-dark mybtn p-4 bg-primary text-dark">Add</button>
        </div >
        <AddTodoModal setRefreshList={setRefreshList} />
    </>);
}

export default Home;