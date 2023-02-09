import React, { useState, useEffect } from 'react';
import axios from "axios";
import './TodoList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoList() {

    const [todoName, setTodoName] = useState("");
    const [todoArray, setTodo] = useState([]);
    const [flag, setFlag] = useState("all");
    const [showSpinner, setShowSpinner] = useState(false);
    var itemCounter = 0;

    const baseURL = "http://localhost:9000";

    const notify = () => toast.error("Something is wrong in the backend service, please try after sometime...",
        {
            onClose: () => {
                setShowSpinner(false);
            },
            autoClose: 5000
        });

    const addNewTodos = text => {
        setShowSpinner(true);
        axios.post(`${baseURL}/addTodoService`, {
            taskName: text,
            isActive: false,
            isCompleted: false
        })
            .then(function (response) {
                setTodo(response.data.data);
                setShowSpinner(false);
                console.log("Todo Added Successfully");
            })
            .catch(function (error) {
                console.log(error);
                notify();
            });
    };

    const onFromSubmit = event => {
        event.preventDefault();
        if (!todoName) return;
        addNewTodos(todoName);
        setTodoName("");

    };

    const checkTodos = (task, index, checkedValue) => {
        setShowSpinner(true);
        axios.put(`${baseURL}/${index}/updateTodoService`, {
            taskName: task,
            isCompleted: checkedValue
        })
            .then(function (response) {
                setTodo(response.data.data);
                setShowSpinner(false);
                console.log("Todo Updated Successfully");
            })
            .catch(function (error) {
                console.log(error);
                notify();
            });
    };

    const markAsActiveTodos = (task, index, checkedValue) => {
        setShowSpinner(true);
        axios.put(`${baseURL}/${index}/updateTodoService`, {
            taskName: task,
            isActive: true,
            isCompleted: true
        })
            .then(function (response) {
                setTodo(response.data.data);
                setShowSpinner(false);
                console.log("Todo Updated Successfully");
            })
            .catch(function (error) {
                console.log(error);
                notify();
            });
    };

    const deleteTodos = index => {
        setShowSpinner(true);
        axios.delete(`${baseURL}/${index}/deleteTodoService`)
            .then(function (response) {
                setTodo(response.data.data);
                setShowSpinner(false);
                console.log("Todo deleted successfully");
            })
            .catch(function (error) {
                console.log(error);
                notify();
            });
    };

    const deleteAllCheckedTodos = () => {
        setShowSpinner(true);
        axios.delete(`${baseURL}/deleteAllCheckedTodoService`)
            .then(function (response) {
                setTodo(response.data.data);
                setShowSpinner(false);
            })
            .catch(function (error) {
                console.log(error);
                alert("Something is wrong in the backend service, please try after sometime...");
                notify();
            });
    };

    useEffect(() => {
        setShowSpinner(true);
        axios.get(`${baseURL}/getTodoService`).then(function (response) {
            setTodo(response.data.data);
            setShowSpinner(false);
        })
            .catch(function (error) {
                console.log(error);
                notify();
            });
    }, []);


    return (
        <>
            <div className="">
                <div>
                    <ToastContainer />
                </div>
                {
                    showSpinner && <div className="spinner">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h5 className="loading">Loading...</h5>
                    </div>
                }
                <div className="p-5">
                    <div className="mb-4">
                        <div className="">
                            <h2 className="text-decoration">Todo List With React and Node js</h2>
                        </div>

                    </div>

                    <form action="" onSubmit={onFromSubmit}>
                        <div className="mt-4 mb-3 d-flex">
                            <div>
                                <input className="margine-right" type="text" placeholder="Enter Todo..." onChange={event => setTodoName(event.target.value)} value={todoName} />
                            </div>
                            <div>
                                <button className="btn btn-primary btn-sm" type="button" onClick={onFromSubmit}>
                                    <img src="assets/images/add_icon.svg" />Add
                                </button>
                            </div>
                        </div>
                    </form>

                    <div>
                        {
                            flag === "all" && todoArray.map((todo, index) => (
                                <>
                                    <Todo
                                        key={index}
                                        todo={todo}
                                        checkTodos={checkTodos}
                                        deleteTodos={deleteTodos}
                                        markAsActiveTodos={markAsActiveTodos}
                                    />
                                </>
                            ))
                        }
                        {
                            flag === "active" && todoArray.map((todo, index) => {
                                if (todo.isActive === true) {
                                    itemCounter++;
                                    return <>
                                        <Todo
                                            key={index}
                                            todo={todo}
                                            checkTodos={checkTodos}
                                            deleteTodos={deleteTodos}
                                            markAsActiveTodos={markAsActiveTodos}
                                        />
                                    </>
                                }
                            })
                        }
                        {
                            flag === "completed" && todoArray.map((todo, index) => {
                                if (todo.isCompleted === true) {
                                    itemCounter++;
                                    return <>
                                        <Todo
                                            key={index}
                                            todo={todo}
                                            checkTodos={checkTodos}
                                            deleteTodos={deleteTodos}
                                            markAsActiveTodos={markAsActiveTodos}
                                        />
                                    </>
                                }
                            })
                        }
                    </div>

                    <span className="">Total items : {flag === "all" ? todoArray.length : itemCounter}</span>
                    <div className="d-flex mt-4">
                        <button className="btn btn-secondary btn-sm margine-right" type="button" onClick={() => setFlag("active")}>
                            <img src="assets/images/active_icon.svg" />Active
                        </button>
                        <button className="btn btn-secondary btn-sm margine-right" type="button" onClick={() => setFlag("completed")}>
                            <img src="assets/images/completed_icon.svg" />Completed
                        </button>
                        <button className="btn btn-secondary btn-sm margine-right" type="button" onClick={() => setFlag("all")}>
                            <img src="assets/images/all_icon.svg" />All
                        </button>
                        <button className="btn btn-secondary btn-sm margine-right" type="button" onClick={deleteAllCheckedTodos}>
                            <img src="assets/images/remove_icon.svg" />Delete all checked items
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


const Todo = props => {

    return (
        <>
            <div className="">
                <div className="d-flex mb-4">
                    <input className="margine-right" type="checkbox" checked={props.todo.isCompleted} onChange={event => props.checkTodos(props.todo.taskName, props.todo.id, event.target.checked)} />
                    <div className="todo-items">
                        <span className={`margine-right ${props.todo.isActive ? "is-done" : ""}`}>{props.todo.taskName}</span>

                        {(() => {
                            if (props.todo.isCompleted) {
                                return (
                                    <span className="">
                                        <button className="btn btn-success btn-sm margine-right" type="button" onClick={() => props.markAsActiveTodos(props.todo.taskName, props.todo.id)}>
                                            <img src="assets/images/active_icon.svg" />Active
                                        </button>
                                        <button className="btn btn-danger btn-sm margine-right" type="button" onClick={() => props.deleteTodos(props.todo.id)}>
                                            <img src="assets/images/remove_icon.svg" />Remove
                                        </button>
                                    </span>
                                )
                            }
                        })()}

                    </div>

                </div>

            </div>
        </>
    );
};

export default TodoList
