import axios from "axios";
import { LOGIN, REGISTER, CREATE_TODO, TODO_LIST, DELETE_TODO, MARK_TODO } from "./apiConstants.js";

export const login = async (data) => {
    return axios.post(LOGIN, data);
}

export const register = async (data) => {
    return axios.post(REGISTER, data);
}

export const createTodoApi = async (data) => {
    let token = getToken();
    return axios.post(CREATE_TODO, data, {
        headers: {
            auth: token
        }
    });
}

export const getTodolistApi = async (data) => {
    let token = getToken();

    return axios.get(TODO_LIST, {
        headers: {
            auth: token

        }

    })
}

export const deleteTodoApi = async (data) => {
    let token = getToken();
    return axios.post(DELETE_TODO, data,
        {
            headers: {
                auth: token
            }
        }
    );
}

export const markTodoApi = async (data) => {
    let token = getToken();
    return axios.post(MARK_TODO, data,
        {
            headers: {
                auth: token
            }
        }
    );
}

export function getToken() {
    let user = localStorage.getItem('user');
    if (!user) return;
    const userObj = JSON.parse(user);
    return userObj.token;
}