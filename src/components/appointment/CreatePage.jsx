import React from 'react';
import RecruitmentForm from './RecruitmentForm';
import AppointmentCreate from './AppointmentCreate';

const CreatePage = () => {
    const defaultFormData = {
        writerId: '', // 적절한 값으로 설정
        partnerId: '', // 적절한 값으로 설정
        time: '12:00',
        meridiem: 'AM',
        status: '',
        isCanceled: '',
        member: '',
        createDate: new Date().toISOString(),
        modifyDate: new Date().toISOString()
    };

    return (
        <div>
            <RecruitmentForm />
            <AppointmentCreate defaultFormData={defaultFormData} /> {/* defaultFormData를 전달 */}
        </div>
    );
}

export default CreatePage;
