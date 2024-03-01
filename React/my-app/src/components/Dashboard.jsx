import React, {useState, useEffect} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../components_css/Dashboard.css';
import logo from '../img/LOGO.png'
import Edit from './Edit_Item';

function Dashboard() {
    const navigate = useNavigate();
    const [Tasks, setTasks] = useState([]);
    const [noTasksMessage, setNoTasksMessage] = useState('');
    const [showEditItem, setShowEditItem] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCloseEditItem = () => {
        setShowEditItem(false);
        setSelectedTask(null);
    }

    const handleAddTaskClick = () => {
        setShowEditItem(true); 
    };

    const handleTaskClick = (Task) => {
        setSelectedTask(Task);
        console.log(Task.id)
        setShowEditItem(true);
    };

    const fetchTasks = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No token found in sessionStorage');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`http://127.0.0.1:8000/task/tasks`, config);
            const data = response.data;
            if (data.length === 0) {
                setNoTasksMessage('No tasks found');
            } else {
                setTasks(data);
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setTimeout(() => navigate('/login/login'), 500);
    }

    return (
        <div className='dashboard_container'>
            {showEditItem && <Edit url={'http://127.0.0.1:8000'} onClose={handleCloseEditItem} editTaskProp={selectedTask} /> }
            <nav className='dashboard_navbar'>
                <div className='dashboard_logo_image'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='dashboard_title'>
                    <h1 id='dashboard_main_title'>TodoTrove</h1>
                </div>
                <div className='dashboard_logout' onClick={handleLogout}>
                    <Link to='/login/login'>Logout</Link>
                </div>
            </nav>

            <div className='tasks_container'>
                <div className='header_tasks'>
                    <h1 id='header_tasks_titles'>Tasks</h1>
                    <button className='add_task_button' onClick={handleAddTaskClick }>
                        <span className="material-symbols-outlined icon_add_task">add</span>
                    </button>
                </div>

                {noTasksMessage && <h2 id='no_task_message'>{noTasksMessage}</h2>}
                <div className='tasks_list'>
                    <ul className='task_item'>
                        {Tasks.slice(0).reverse().map((task, index) => (
                            <li className='task' key={index} onClick={()=> handleTaskClick(task)}>
                                <div id='task_item_url'> {task.URL}</div>
                                <div id='task_item_title'> {task.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;