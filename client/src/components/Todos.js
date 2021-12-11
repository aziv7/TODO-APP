import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

import Modal from 'react-modal';

const Todos = ({ history }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { user, logout } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [todoEdit, setTodoEdit] = useState({ title: '', status: false });

  function openModal(todo) {
    if (!todo)
      setTodoEdit({
        title: '',
        status: false,
        adding: true,
        description: '',
        deadline: new Date(),
      });
    else setTodoEdit({ ...todo });

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const removeTodo = async (e, todo) => {
    e.preventDefault();
    window.confirm(`would you like to remove ${todo.title}?`);
    const res = await fetch(`todos/${todo._id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    const arr = todos.filter((e) => e._id !== data._id);

    setTodos(arr);
  };
  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch(`todos`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        status: todoEdit.status,
        title: todoEdit.title,
        deadline: todoEdit.deadline,
        description: todoEdit.description,
      }),
    });
    const data = await res.json();

    setTodos([data, ...todos]);
  };

  const editTodo = async (e) => {
    e.preventDefault();
    const res = await fetch(`todos/${todoEdit._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        status: todoEdit.status,
        title: todoEdit.title,
        deadline: todoEdit.deadline,
        description: todoEdit.description,
      }),
    });
    const data = await res.json();

    const arr = todos.map((e) => {
      if (e._id === data._id) {
        e = data;
      }
      return e;
    });

    setTodos([...arr]);
    closeModal();
  };

  const leave = (e) => {
    e.preventDefault();
    logout();

    history.push('/login');
  };

  useEffect(() => {
    async function getTodos() {
      const res = await fetch('/todos', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setTodos(data);
    }
    if (!localStorage.getItem('token')) history.push('/login');

    getTodos();
  }, [user]);
  return (
    <>
      <div>
        {user && user.name} Todos{' '}
        <button
          type='button'
          className='btn btn-success'
          onClick={(ev) => {
            ev.preventDefault();
            openModal(null);
          }}
        >
          +
        </button>
        <button type='button' className='btn btn-danger' onClick={leave}>
          Disconnect
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Status</th>
            <th scope='col'>Deadline</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos &&
            todos.map(
              (e, i) =>
                e && (
                  <tr key={e._id}>
                    <th scope='row'>{i}</th>
                    <td>
                      {e && e.title}
                      {e && e.status ? (
                        <span className='badge badge-success'>
                          <p>Done</p>{' '}
                        </span>
                      ) : (
                        <span className='badge badge-info'>On progress</span>
                      )}
                    </td>
                    <td>
                      <p>{e && e.description}</p>
                    </td>
                    <td>{e && e.status ? <p>Done</p> : <p>On progress</p>}</td>
                    <td>{e && e.deadline}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => openModal(e)}
                        className='btn btn-info mx-2'
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger mr-2'
                        onClick={(ev) => removeTodo(ev, e)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='container-fluid col-12'>
          <form>
            <div className='form-group'>
              <label htmlFor='Title'>Title</label>
              <input
                name='title'
                onChange={(e) =>
                  setTodoEdit({ ...todoEdit, title: e.target.value })
                }
                value={todoEdit.title}
                type='text'
                className='form-control'
                id='Title'
                aria-describedby='emailHelp'
                placeholder='Title'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Description'>Description</label>
              <input
                name='description'
                onChange={(e) =>
                  setTodoEdit({ ...todoEdit, description: e.target.value })
                }
                value={todoEdit.description}
                type='text'
                className='form-control'
                id='Description'
                aria-describedby='Description'
                placeholder='Description'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Deadline'>Deadline</label>
              <input
                name='deadline'
                onChange={(e) =>
                  setTodoEdit({ ...todoEdit, deadline: e.target.value })
                }
                value={todoEdit.deadline}
                type='date'
                className='form-control'
                id='Description'
                aria-describedby='Deadline'
              />
            </div>
            <div className='form-group flex'>
              <label htmlFor='status'>Done:</label>
              <input
                type='checkbox'
                onChange={(e) =>
                  setTodoEdit({ ...todoEdit, status: e.target.checked })
                }
                checked={todoEdit.status}
                name='status'
                className='form-check-input'
                id='status'
              />
            </div>

            {todoEdit.adding ? (
              <button
                type='submit'
                onClick={addTodo}
                className='btn btn-success'
              >
                Add
              </button>
            ) : (
              <button
                type='submit'
                onClick={editTodo}
                className='btn btn-primary'
              >
                Edit
              </button>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Todos;
