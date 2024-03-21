import React, { useState, useEffect } from 'react';
import { useMypageMyRecruitment } from '../../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { Link } from 'react-router-dom';
import RecruitmentDetail from '../../../recuitment/RecruitmentDetail';

function RecruitmentCard({ item, index }) {

    const [card, setCard] = useState({
        id: "",
        title: "",
        content: "",
        recruit_date: "",
        duration: "",
        routine: "",
    })

    useEffect(() => {
        const recruite_date = item['recruitmentDto']['recruit_date']
        const date = recruite_date.split("T")[0].split("-");
        const time = recruite_date.split("T")[1].split(".")[0].split(":");
        const duration = item['recruitmentDto']['duration'].split(":")

        setCard({
            ...item['recruitmentDto'],
            recruit_date: date[0].slice(-2) + "년 " + date[1] + "월 " + date[2] + "일 " + time[0] + ":" + time[1],
            duration : duration[0] + "시간 " + duration[1] + "분",
        })
    }, [item])

    return (
        <>
            <Link className="card w-3/4 bg-base-100 shadow-sm hover:shadow-2xl m-2"
             to='/recruitments/detail/:id' element={<RecruitmentDetail />}>
                    <div className="card-body">
                        <h2 className="card-title">{card.title}</h2>
                        <div className='text-sm'>
                        <p>- 운동일자 : {card.recruit_date}</p>
                        <p>- 운동시간 : {card.duration}</p>
                        <p>- 운동루틴 : {card.routine}</p>
                        </div>
                    </div>
            </Link>
        </>
    )
}


function Myrecruitment(props) {
    const { data: myrecruitmentList, isLoading, isError } = useMypageMyRecruitment();

    console.log(myrecruitmentList);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (isError) {
        return (
            <div>Error occured...</div>
        )
    }

    return (
        <>
            <h2 className='mx-2 font-bold text-lg'>나의 모집글</h2>
            <section className='flex flex-col w-full items-center'>
                {myrecruitmentList.map((item, index) => (
                    <RecruitmentCard item={item} index={index} />
                ))}
            </section>
            <div className='flex justify-center items-center'>
                <button className='btn btn-primary m-4'><Link to="/mypage/list">이전</Link></button>
            </div>
        </>
    );
}

export default Myrecruitment;