import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateApplication } from '../../openapi/orval_query/api/application/application'; // OpenAPI에서 생성된 API 함수 import
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';
import { useRecruitmentDetails } from '../../openapi/orval_query/api/recruitments/recruitments';

const AppointmentCreate = () => {
    const { id } = useParams(); // useParams로 약속 ID 가져오기
    const recruitmentId = parseInt(id, 10); // 문자열로 된 ID를 정수로 변환

    const { data: detail } = useRecruitmentDetails(recruitmentId);
    const [formData, setFormData] = useState({
        writerId: '',
        partnerId: '',
        title: '',
        content: '',
        recruitDate: new Date().toISOString(), // 날짜 초기값을 현재 날짜로 설정
        place: '',
        partnerGender: '',
        partnerAge: '',
        routine: '',
        duration: '',
        time: '12:00', // 시간 초기값 설정
        meridiem: 'AM', // 오전/오후 초기값 설정
        status: '',
        isCanceled: '',
        member: '',
        createDate: new Date().toISOString(),
        modifyDate: new Date().toISOString()
    });

    const navigate = useNavigate();
    const { mutate, isLoading, isError, error } = useCreateApplication(); // useCreateApplication 훅 사용

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "duration") {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            recruitDate: date.toISOString()
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const [hour, minute] = formData.time.split(':');
        const hours = formData.meridiem === 'PM' ? parseInt(hour, 10) % 12 + 12 : parseInt(hour, 10) % 12;
        const formattedDate = moment.tz(formData.recruitDate, "Asia/Seoul").format(); // 시간대 변환

        const payload = {
            ...formData,
            recruitDate: formattedDate,
        };

        mutate({ data: payload }, {
            onSuccess: () => {
                alert('약속이 성공적으로 생성되었습니다!');
                navigate('/appointment/list');
            },
            onError: (error) => {
                console.error('Error creating recruitment:', error);
                alert('약속 생성에 실패했습니다.');
            }
        });
    };

    useEffect(() => {
        if (detail) {
            setFormData(prevState => ({
                ...prevState,
                writerId: detail?.recruitmentDto?.writerId,
                partnerId: detail?.recruitmentDto?.partnerId,
                title: detail?.recruitmentDto?.title,
                content: detail?.recruitmentDto?.content,
                recruitDate: moment(detail?.recruitmentDto?.recruit_date).toDate().toISOString(),
                place: detail?.recruitmentDto?.place,
                partnerGender: detail?.recruitmentDto?.partnerGender,
                partnerAge: detail?.recruitmentDto?.partnerAge,
                routine: detail?.recruitmentDto?.routine,
                duration: detail?.recruitmentDto?.duration,
            }));
        }
    }, [detail]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto pt-4">

            <input
                type="text"
                name="writerId"
                value={formData.writerId}
                onChange={handleChange}
                placeholder="작성자 ID"
                className="input input-bordered w-full mb-2"
            />

            <input
                type="text"
                name="partnerId"
                value={formData.partnerId}
                onChange={handleChange}
                placeholder="파트너 ID"
                className="input input-bordered w-full mb-2"
            />

            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="제목"
                className="input input-bordered w-full mb-2"
            />

            <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="내용"
                className="textarea textarea-bordered w-full mb-2"
            />

            <DatePicker
                selected={formData.recruitDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="input input-bordered w-full mb-2"
            />

            <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="장소"
                className="input input-bordered w-full mb-2"
            />

            <select
                name="partnerGender"
                value={formData.partnerGender}
                onChange={handleChange}
                className="select select-bordered w-full mb-2"
            >
                <option value="">성별 선택</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="성별 무관">무관</option>
            </select>

            <select
                name="partnerAge"
                value={formData.partnerAge}
                onChange={handleChange}
                className="select select-bordered w-full mb-2"
            >
                <option value="">원하는 파트너 연령대</option>
                <option value="10">10대</option>
                <option value="20">20대</option>
                <option value="30">30대</option>
                <option value="40">40대</option>
                <option value="50">50대</option>
            </select>

            <input
                type="text"
                name="routine"
                value={formData.routine}
                onChange={handleChange}
                placeholder="운동 루틴"
                className="input input-bordered w-full mb-2"
            />

            <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                pattern="(0[0-4]):[0-5]0"
                placeholder="운동시간 - 00:00 (0 ~ 4시간, 10분간격)"
                className="input input-bordered w-full mb-2"
            />

            <button type="submit" className="btn btn-primary">약속생성</button>
        </form>
    );
};

export default AppointmentCreate;
