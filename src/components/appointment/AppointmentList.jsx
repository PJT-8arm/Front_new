import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome 아이콘 라이브러리에서 FontAwesomeIcon을 가져옴
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // 달력 모양의 아이콘을 가져옴
import './AppointmentList.css';
import { axiosInstance } from '../../utils/axiosInstance';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance({
                    url: '/api/applications/list',
                    method: 'get'
                });
                setAppointments(response);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const formatDate = (dateString) => {
        return moment(dateString).format('MM-DD');
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
                                <div className="calendar-container">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="1x" className="calendar-icon" />
                                    <p className="date-text">{formatDate(appointment.date)}</p>
                                </div>
                                    <div className="titlebox">
                                        {/* 달력 모양의 아이콘과 'DD' 텍스트를 함께 표시 */}
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