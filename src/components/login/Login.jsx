import React, { useEffect, useRef, useState } from 'react';
import './loginStyles.css';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const personName = useRef();
    const personImg = useRef();
    const [showTodo, setShowTodo] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('name');

    useEffect(() => {
        if (isAuth) {
            setShowTodo(true);
        }
    }, [isAuth]);

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (personName.current.value && selectedFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(selectedFile);
            fileReader.onload = (e) => {
                const personPhoto = e.target.result;
                localStorage.setItem('name', personName.current.value);
                localStorage.setItem('photo', personPhoto);
                console.log(personPhoto);
                window.location.reload();
            };
        } else {
            alert('fill all fields');
        }
    };

    return (
        <>
            {showTodo ? (
                navigate('/todo')
            ) : (
                <div className='main'>
                    <div className='login-main-whitebox'>
                        <div className='login-title'>get started</div>
                        <div className='text-desc'>add a photo</div>
                        <div className='photo-section'>
                            <input
                                className='photo-icon'
                                id='file'
                                type='file'
                                accept='image/*'
                                ref={personImg}
                                onChange={handleFileSelect}
                            />
                            <label htmlFor='file'></label>
                        </div>
                        {selectedFile && <div className='file-status'>File chosen</div>}
                        <div className='text-desc name-text'>fill your name</div>
                        <div className='auth-section'>
                            <input type='text' placeholder='your name' ref={personName} />
                            <button className='link' onClick={handleSubmit}>
                                sign in
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
