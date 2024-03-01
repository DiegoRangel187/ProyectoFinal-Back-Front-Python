import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import '../components_css/login.css';
import logo from '../img/LOGO.png'

const App = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const showMessageSuccess = (message, duration = 5000) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage('');
        }, duration);
    };
    
    const showMessageError = (message, duration = 5000) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, duration);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]:value,
        });}

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('form data:', formData);
        try {
            const response = await fetch ('http://127.0.0.1:8000/login/login/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                showMessageSuccess('¡Login Successfull! 😎');
                const data = await response.json();
                const token = data.token;
                sessionStorage.setItem('token', token);
                setTimeout(() => navigate('/task/tasks'), 500)
            } else {
                const data = await response.json();
                showMessageError(data.message || '¡Login Error! 💀');
            }
        } catch (error) {
            showMessageError('¡Login Error! 💀');
        }
    };

    return (
    <div className="login_container">
        <nav className='login_navbar'>
            <div className='logo_image'>
                <img src={logo} alt='logo' />
            </div>
            <div className='title'>       
                <h1 id='main_title'>TodoTrove</h1>
            </div>
        </nav>
        <div className='login_welcome_form'>
            <div className='welcome_login'>
                <h2>Check your Task and manage your Time</h2>
                <p></p>
                <p id='login_signin_mesagge'>Or if you havent an account <Link to='/login/signin'>Sign in</Link></p>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="login-form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} />
                    <button type="submit" className="login_button"> <Link to='/tasks/'></Link> Login </button>
                </div>
            </form>
            {successMessage && <div className="message-container_successful">{successMessage}</div>}
            {errorMessage && <div className="message-container_error">{errorMessage}</div>}
        </div>
    </div>
  );
};

export default App;