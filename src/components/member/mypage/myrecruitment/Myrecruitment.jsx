import React from 'react';
import { useMypageMyRecruitment } from '../../../../openapi/orval_query/api/mypage-controller/mypage-controller';

function RecruitmentCard({item, index}) {

    console.log(item, index)
    console.log(item['recruitmentDto'], index)
    return (
        <article className='border' key={index}>
            <div>
                제목 : {item['recruitmentDto'].title}
            </div>
            <div>
                내용 : {item['recruitmentDto'].content}
            </div>
            <div>
                날짜 : {item['recruitmentDto'].recruit_date}
            </div>
            <div>
                시간 : {item['recruitmentDto'].recruit_time}
            </div>
            <div>
                운동루틴 : {item['recruitmentDto'].routine}
            </div>
        </article>
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
            {myrecruitmentList.map((item, index) => (
                <RecruitmentCard item={item} index={index} />
            ))}
        </>
    );
}

export default Myrecruitment;