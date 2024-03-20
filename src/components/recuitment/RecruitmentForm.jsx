import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 임포트합니다.
import { useRecruitmentAdd } from '../../openapi/orval_query/api/recruitments/recruitments';

const RecruitmentForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        recruit_date: '',
        place: '',
        partnerGender: '',
        partnerAge: 0,
        routine: '',
        duration: ''
    });

    const navigate = useNavigate(); // useNavigate Hook을 사용합니다.
    const { mutate, isLoading, isError, error } = useRecruitmentAdd();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate({data: formData}, {
            onSuccess: () => {
                alert('모집 글이 성공적으로 생성되었습니다!');
                navigate('/'); // 성공 후 상세 페이지 URL로 이동합니다.
            },
            onError: (error) => {
                console.error('Error creating recruitment:', error);
                alert('모집 글 생성에 실패했습니다.');
            }
        });
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="제목"
            />

            <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="내용"
            />

            <input
                type="text"
                name="recruit_date"
                value={formData.recruit_date}
                onChange={handleChange}
                placeholder="모집 날짜 (예: 2024-03-15 14:00:00)"
            />

            <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="장소"
            />

            <select
                name="partnerGender"
                value={formData.partnerGender}
                onChange={handleChange}
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
            />

            <input
                type="text"
                name="routine"
                value={formData.routine}
                onChange={handleChange}
                placeholder="운동 루틴"
            />

            <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="운동 시간 (예: 14:00:00)"
            />

            <button className='btn btn-primary' type="submit">모집글 작성</button>
        </form>
    );
}

export default RecruitmentForm;
