import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../components_css/Edit_Item.css';

function EditItem({ onClose, editTaskProp }) {
    const url = 'http://127.0.0.1:8000'
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('');
    const [showTask, setShowTask] = useState(false);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (editTaskProp) {
            setTitle(editTaskProp.title);
            setDescription(editTaskProp.description);
            setDeadline(editTaskProp.deadline);
            setPriority(editTaskProp.priority)
        }
    }, [editTaskProp]);

    const urlPath = editTaskProp ? `${url}/task/update_task` : `${url}/task/create_task`;

    const formData = editTaskProp ? {
        id: editTaskProp.id,
        title: editTaskProp.title,
        description: editTaskProp.description,
        deadline: editTaskProp.deadline,
        priority: editTaskProp.priority
    } : {
        title: title,
        description: description,
        deadline: deadline,
        priority: priority
    }

    const handleSubmit = async (event) => {
        try {
            const config = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            };

            let response;

            if (editTaskProp) {
                response = await axios.put(
                    urlPath,
                    formData,
                    config
                );
            } else {
                response = await axios.post (
                    urlPath,
                    formData,
                    config
                );
            }
            console.log(response.data);
            onClose();
        } catch (error) {
            console.error('Error creating password:', error);
        }
    };

    const handleDeleteTask = async (event) => {
        const deleteId = editTaskProp.id
        try {
            const config = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: deleteId})
            };

            const response = await fetch(`${url}/task/delete_task`, config);

            if (!response.ok) {
                throw new Error('Error deleting task')
            }

            const data = await response.json();
            console.log(data);
            onclose();
            window.localStorage.reload();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='edit_item_container'>
            <div className='edit_item_header'>
                <h2>{editTaskProp ? 'Edit task' : 'New task'}</h2>
                <button className='edit_item_close_button' onClick={onClose}><span className="material-symbols-outlined">close</span></button>
            </div>

            <div className='edit_item_form_container'>
                <form className='edit_item_form' onSubmit={handleSubmit}>
                    <div className='edit_item_form_input'>
                        <label htmlFor='edit_item_form_input_name'>Title</label>
                        <input placeholder="Task Title" type='string' id='edit_item_form_input_name' name='edit_item_form_input_name' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className='edit_item_form_input'>
                        <label htmlFor='edit_item_form_input_url'>Description</label>
                        <input placeholder="Short description of the task" type='string' id='edit_item_form_input_url' name='edit_item_form_input_url' value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>

                    <div className='edit_item_form_input'>
                        <div className='edit_item_form_input'>
                            <label htmlFor='edit_item_form_input_password'>Deadline</label>
                            <div className='password_input'>
                                <input type='date' id='edit_item_form_input_password' name='edit_item_form_input_password' value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                            </div>
                        </div>
                    </div>

                    <div className='edit_item_form_input'>
                        <label htmlFor='edit_item_form_input_url'>Priority</label>
                        <input placeholder="1" type='number' id='edit_item_form_input_url' name='edit_item_form_input_url' value={priority} onChange={(e) => setPriority(e.target.value)} required />
                    </div>

                    <div className='edit_item_form_submit'>
                        <input type='submit' value='Create task'/>
                        {editTaskProp && (
                            <button className='delete_item_button' onClick={handleDeleteTask}>
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditItem;