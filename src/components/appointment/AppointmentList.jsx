import React from 'react';
import { useGetAllApplications } from '../../openapi/orval_query/api/application/application';

const AppointmentList = () => {
    const { data, isLoading, isError, error } = useGetAllApplications();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>약속 목록</h2>
            {data.map((appointment) => (
                <div key={appointment.id}>
                    <h3>{appointment.title}</h3>
                    {/* 다른 필드들도 표시합니다. */}
                </div>
            ))}
        </div>
    );
};

export default AppointmentList;
