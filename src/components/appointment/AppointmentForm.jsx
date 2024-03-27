import React, { useState } from 'react';
import { useCreateApplication } from '../../openapi/orval_query/api/application/application';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        writer: '',
        partner: '',
        isCanceled: false,
        status: '',
        createDate: '',
        modifyDate: '',
    });

    const { mutate } = useCreateApplication();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 약속 생성 API 호출
        try {
            await mutate({ data: formData });
            alert('약속이 성공적으로 생성되었습니다!');
            navigate('/appointment/list'); // 약속 생성 후 홈페이지로 이동
        } catch (error) {
            console.error('약속 생성 실패:', error);
            alert('약속 생성에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 약속 생성에 필요한 입력 폼들을 추가합니다. */}
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="제목" />
            <input type="text" name="writer" value={formData.writer} onChange={handleChange} placeholder="작성자" />
            <input type="text" name="partner" value={formData.partner} onChange={handleChange} placeholder="파트너" />
            <input type="checkbox" name="isCanceled" checked={formData.isCanceled} onChange={handleChange} />
            <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="상태" />
            <input type="text" name="createDate" value={formData.createDate} onChange={handleChange} placeholder="생성일자" />
            <input type="text" name="modifyDate" value={formData.modifyDate} onChange={handleChange} placeholder="수정일자" />
            <button type="submit">약속 생성</button>
        </form>
    );
};

export default AppointmentForm;
