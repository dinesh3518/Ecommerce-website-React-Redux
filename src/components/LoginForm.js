import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { login } from '../app/userSlice';
import { setCartItems } from '../app/cartSlice';
import SocialLogin from './SocialLogin';


export default function LoginForm({ setPop }) {
    const [show, setShow] = useState(true);
    const [errors, setErrors] = useState({});
    const [loginErrors, setLoginErrors] = useState('');
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const clearform = () => {
        setFormData(
            {
                username: '',
                password: '',
            })
    }

    const handleClose = () => {
        setShow(false);
        setPop(false);
        clearform();
        setErrors({})
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Login API call
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    username: formData.username,
                    password: formData.password,
                })
            }).then(res => {
                if (res.ok) {
                    setLoginErrors('');
                    return res.json();

                }
                else {
                    console.log(res)
                    setLoginErrors('Invalid username or password');
                }
            }).then(json => {
                if (json) {
                    dispatch(login(json));
                    dispatch(setCartItems(json.username));
                    handleClose();
                }

            }).catch(error => console.error(error));

        }
    }


    return (
        <div>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {loginErrors && <p className='text-danger'>{loginErrors}</p>}
                        <form>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    autoComplete="on"
                                />
                                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="on"
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="success" style={{ minWidth: '15rem' }} onClick={handleSubmit}>Login</Button>
                    <SocialLogin/>
                </Modal.Footer>
            </Modal>
        </div>

    );
}
