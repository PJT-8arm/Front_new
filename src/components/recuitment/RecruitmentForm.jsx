import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecruitmentAdd } from '../../openapi/orval_query/api/recruitments/recruitments';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone'

const RecruitmentForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        recruitDate: new Date(), // 날짜 초기값을 현재 날짜로 설정
        place: '',
        partnerGender: '',
        partnerAge: 0,
        routine: '',
        duration: '',
        time: '12:00', // 시간 초기값 설정
        meridiem: 'AM', // 오전/오후 초기값 설정
    });

    const navigate = useNavigate();
    const { mutate, isLoading, isError, error } = useRecruitmentAdd();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            recruitDate: date
        }));
    };

    // 시간과 오전/오후 선택에 대한 Select 컴포넌트의 options
    const timeOptions = Array.from({ length: 12 }, (v, i) => ({ value: `${i+1}:00`, label: `${i+1}:00` }));
    const meridiemOptions = [
        { value: 'AM', label: '오전' },
        { value: 'PM', label: '오후' }
    ];

    const handleTimeChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            time: selectedOption.value
        }));
    };

    const handleMeridiemChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            meridiem: selectedOption.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const [hour, minute] = formData.time.split(':');
        const hours = formData.meridiem === 'PM' ? parseInt(hour, 10) % 12 + 12 : parseInt(hour, 10) % 12;
        console.log(moment.tz(formData.recruitDate.toISOString() , "Asia/Seoul"));
        const year = formData.recruitDate.getFullYear();
        const month = String(formData.recruitDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
        const day = String(formData.recruitDate.getDate()).padStart(2, "0");
        console.log(`${year}-${month}-${day}`);
        const formattedDate = `${formData.recruitDate.toISOString().split('T')[0]}T${hours.toString().padStart(2, '0')}:${minute}:00`;
        const recruitDate = `${year}-${month}-${day} ${hours.toString().padStart(2, '0')}:${minute}:00`;

        const payload = {
            ...formData,
            recruitDate: recruitDate,
        };

        mutate({data: payload}, {
            onSuccess: () => {
                alert('모집 글이 성공적으로 생성되었습니다!');
                navigate('/');
            },
            onError: (error) => {
                console.error('Error creating recruitment:', error);
                alert('모집 글 생성에 실패했습니다.');
            }
        });

        // 여기서 payload를 서버로 전송하는 로직을 구현합니다.
        console.log(payload);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto pt-4">

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

            <Select
                options={meridiemOptions}
                onChange={handleMeridiemChange}
                className="mb-2"
            />

            <Select
                options={timeOptions}
                onChange={handleTimeChange}
                className="mb-2"
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

            <input
                type="number"
                name="partnerAge"
                value={formData.partnerAge}
                onChange={handleChange}
                placeholder="동반자 연령"
                className="input input-bordered w-full mb-2"
            />

            <input
                type="text"
                name="routine"
                value={formData.routine}
                onChange={handleChange}
                placeholder="운동 루틴"
                className="input input-bordered w-full mb-2"
            />

            <button className="btn btn-primary w-full" type="submit">모집글 작성</button>

        </form>
    );
}

export default RecruitmentForm;