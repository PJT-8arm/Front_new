import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import './AppointmentList.css';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/applications/list');
                setAppointments(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const formatDate = (dateString) => {
        return moment(dateString).format('YYYY-MM-DD HH:mm');
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="appointment-list">
            {appointments.map((appointment, index) => (
                <div key={index} className="appointment-item">
                    <Link to={`/appointments/detail/${appointment.id}`} className="link-style">
                        <div className="card">
                            <div className="cardbody">
                                <div className="content">
                                    <div className="titlebox">
                                        <p className="title">{appointment.title}</p>
                                    </div>
                                    <div className="tag">
                                        <p className='tag-list'>{'#' + appointment.partnerAge + '대'}</p>
                                        <p className='tag-list'>{'#' + appointment.partnerGender}</p>
                                        <p className='tag-list'>{'#' + appointment.place}</p>
                                        <p className='tag-list'>{'#' + appointment.routine}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AppointmentList;