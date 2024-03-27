import React from 'react';
import '../App.css';

const Topbar = () => {
    return (
        <div className='Topbar' style={{ display: 'flex' }}>
            <div className='logo' style={{ margin: '0.5rem 1rem 0rem 1rem' }}>
                <img src='/public/logo.png' alt='로고 이미지' />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem 1rem 0rem 1rem' }}>
                <label style={{ height: 40, width: 180 }} className="input input-bordered flex items-center">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg style={{ position: 'absolute', right: 0, marginRight: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Topbar;