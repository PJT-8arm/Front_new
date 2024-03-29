import React, { useState } from 'react';
import { useMypageMyApplication } from '../../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

function RecruitmentCard({ item, index }) {

    const [card, setCard] = useState({
        isCanceled: false,
        id: 0,
        partnerId: 0,
        status: "",
        writerId: 0,
        title: "",
        content: "",
        place: "",
        partnerGender: "",
        partnerAge: "",
        routine: "",
        duration: "",
    })

    useEffect(() => {
        const recruite_date = item['recruit_date']
        // 변수 초기화
        let date = ["0000", "00", "00"];
        let time = ["00", "00"];
        if (recruite_date) {
            date = recruite_date.split("T")[0].split("-");
            time = recruite_date.split("T")[1].split(".")[0].split(":");
        }

        //변수 초기화
        const duration = item['duration']
        let durationList = ["00", "00"];
        if(duration){
            durationList = duration.split(":") // null인 경우 배제
        }

        setCard({
            ...item,
            recruit_date: date[0].slice(-2) + "년 " + date[1] + "월 " + date[2] + "일 " + time[0] + ":" + time[1],
            duration: duration[0] + "시간 " + duration[1] + "분",
        })

    }, [item])

    return (
        <>
            <Link className="card w-3/4 bg-base-100 shadow-sm hover:shadow-2xl m-2"
                to={`/recruitments/detail/${card.id}`} element={<RecruitmentDetail />}>
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

function Myapplication() {
    const location = useLocation();
    const queries = new URLSearchParams(location.search);
    const page = queries.get('page');

    let pageNum = page || 0;
    const [searchParam, setSearchParam] = useSearchParams({ page: pageNum });

    const { data: MyapplicationPage, isLoading, isError } = useMypageMyApplication({ page: pageNum });

    const clickPre = () => {
        pageNum = parseInt(pageNum) - 1
        console.log(pageNum);
        setSearchParam({ page: pageNum });
    }

    const clickNext = () => {
        pageNum = parseInt(pageNum) + 1
        console.log(pageNum);
        setSearchParam({ page: pageNum });
    }

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
            <h2 className='mx-2 font-bold text-lg'>나의 약속</h2>
            <section className='flex flex-col w-full items-center'>
                {MyapplicationPage.content.map((item, index) => (
                    <ApplicationCard item={item} index={index} />
                ))}
            </section>
            {/* 페이지 네이션 */}
            <section className='flex justify-center'>
                <div className="join">
                    {!MyapplicationPage.first && <button onClick={clickPre} className="join-item btn">«</button>}
                    <button className="join-item btn">Page {MyapplicationPage.number + 1}</button>
                    {!MyapplicationPage.last && <button onClick={clickNext} className="join-item btn">»</button>}
                </div>
            </section>
            <div className='flex justify-center items-center'>
                <button className='btn btn-primary m-4'><Link to="/mypage/list">이전 페이지</Link></button>
            </div>
        </>
    );
}

export default Myapplication;