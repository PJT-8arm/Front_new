import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
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

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${month}/${day}`;
      };

    // 오늘 날짜 가져오기
    const today = new Date();


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="appointment-list">
            {appointments.map((appointment, index) => (
                <div key={index} className="appointment-item">
                    <Link to={`/appointments/detail/${appointment.id}`} className="appointlink-style">
                        <div className="appointcard">
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-evenly', alignItems:'center'}} className='appointcardbody'>
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        <img style={{ width: '3.5rem' }} src='/images/calendar.png' />
                                        <p style={{ position: 'absolute', top: 22, left: '0.5rem' }}>{formatDate(appointment.recruit_date)}</p>
                                    </div>
                                    <div className="appointcontent">
                                        <div className="appointtitlebox">
                                            <p className="appointtitle">{appointment.title}</p>
                                        </div>
                                        <div className="appointtag">
                                            <p className='appointtag-list'>{'#' + appointment.partnerAge + '대'}</p>
                                            <p className='appointtag-list'>{'#' + appointment.partnerGender}</p>
                                            <p className='appointtag-list'>{'#' + appointment.place}</p>
                                            <p className='appointtag-list'>{'#' + appointment.routine}</p>
                                        </div>
                                    </div>
                                    {new Date(appointment.recruit_date) < today && (
                                    <div style={{backgroundColor: 'pink', width: '50px', height: '22px', borderRadius: '10px', textAlign: 'center'}}>
                                        <p>완료</p>
                                    </div>
                                    )}

                                    {new Date(appointment.recruit_date) > today && (
                                     <div style={{backgroundColor: 'skyblue', width: '50px', height: '22px', borderRadius: '10px', textAlign: 'center'}}>
                                        <p>예정</p>
                                     </div>
                                    )}

                                </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AppointmentList;