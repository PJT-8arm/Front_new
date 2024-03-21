import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecruitmentAdd } from '../../openapi/orval_query/api/recruitments/recruitments';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

const RecruitmentForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        recruitDate: {
            date: new Date(), // 현재 날짜로 초기화
            hour: null,
            period: null
        },
        place: '',
        partnerGender: '',
        partnerAge: 0,
        routine: '',
        duration: { hour2: null, period2: null } // 시간과 AM/PM을 분리해서 관리합니다.
    });
    

    const navigate = useNavigate();
    const { mutate, isLoading, isError, error } = useRecruitmentAdd();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleDateChange = (date) => {
        console.log(date); // 디버깅: 선택된 날짜 값 확인
        setFormData(prevState => ({
            ...prevState,
            recruitDate: {
                ...prevState.recruitDate,
                date: date
            }
        }));
    }

    const handleDurationChange = (selectedOption, action) => {
        setFormData(prevState => ({
            ...prevState,
            recruitDate: {
                ...prevState.recruitDate,
                [action.name]: selectedOption.value
            }
        }));
    }

    const handleTimeChange = (selectedOption, action) => {
        setFormData(prevState => ({
            ...prevState,
            duration: { ...prevState.duration, [action.name]: selectedOption.value }
        }));
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 필요한 경우, formData를 서버에 맞게 조정하세요.
        mutate({data: formData}, {
            onSuccess: () => {
                alert('모집 글이 성공적으로 생성되었습니다!');
                navigate('/');
            },
            onError: (error) => {
                console.error('Error creating recruitment:', error);
                alert('모집 글 생성에 실패했습니다.');
            }
        });
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const periodOptions = [
        { value: 'AM', label: '오전' },
        { value: 'PM', label: '오후' }
    ];

    const hourOptions = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: i + 1 }));

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

            <div className="mb-2">
                <DatePicker
                    selected={formData.recruitDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="모집 날짜 선택"
                    className="input input-bordered w-full"
                />
            </div>

            <div className="flex space-x-2 mb-2">
                <Select
                    name="period"
                    options={periodOptions}
                    onChange={handleDurationChange}
                    value={periodOptions.find(option => option.value === formData.recruitDate.period)}
                    placeholder="AM/PM"
                    className="w-1/3"
                />
                <Select
                    name="hour"
                    options={hourOptions}
                    onChange={handleDurationChange}
                    value={hourOptions.find(option => option.value === formData.recruitDate.hour)}
                    placeholder="시간"
                    className="w-2/3"
                />
            </div>

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
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="any">무관</option>
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

            <div className="flex space-x-2 mb-2">
            <Select
                name="period2"
                options={periodOptions}
                onChange={handleDurationChange}
                value={periodOptions.find(option => option.value === formData.duration.period)} // 현재 선택된 period 옵션 객체를 찾아서 전달
                placeholder="AM/PM"
                className="w-1/3"
            />
            <Select
                name="hour2"
                options={hourOptions}
                onChange={handleDurationChange}
                value={hourOptions.find(option => option.value === formData.duration.hour)} // 현재 선택된 hour 옵션 객체를 찾아서 전달
                placeholder="시간"
                className="w-2/3"
            />
            </div>

            <button className="btn btn-primary w-full" type="submit">모집글 작성</button>

        </form>
    );
}

export default RecruitmentForm;

