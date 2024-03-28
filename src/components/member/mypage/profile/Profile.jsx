import React, { useEffect, useState } from 'react';
import { useMypageModifyProfile, useMypageProfile } from '../../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { Link } from 'react-router-dom';

function Profile(props) {
    const { data: profileDto, isLoading: loadingGet, isError: errorGet } = useMypageProfile();
    const { mutate: modifiyProfile, isLoading: loadingPost, isError: errorPost } = useMypageModifyProfile();

    const [profileData, setData] = useState({
        age: 0,
        gender: "남성",
        benchPress: 0,
        deadLift: 0,
        squat: 0,
        totalWeight: 0,
    });

    console.log(profileDto, profileData);

    useEffect(() => {
        if (profileDto) {
            setData({
                age: profileDto.age,
                gender: profileDto.gender,
                benchPress: profileDto.benchPress,
                deadLift: profileDto.deadLift,
                squat: profileDto.squat,
                totalWeight: profileDto.totalWeight,
            })
        }
    }, [profileDto])

    const handleChange = (e) => {
        const { id, value } = e.target;

        let newvalue = value;
        if (id === 'benchPress' || id === 'deadLift' || id === 'squat') {
            newvalue = parseInt(value);
        }
        setData(preData => ({
            ...preData,
            [id]: value,
            totalWeight: caltotalweight(newvalue, id, preData)
        }));
    }

    {/* 초기에 setData를 2중으로 totalweight를 구했으나 useState가 비동기 방식이기 때문에 합산이 제대로 이루어지지 않음
이를 보완하기 위해서 함수형으로 이전 데이터을 받아와서 변화량을 적용 from gpt */}
    const caltotalweight = (newvalue, id, preData) => {
        if (id === 'benchPress' || id === 'deadLift' || id === 'squat') {
            return parseInt(preData.benchPress) + parseInt(preData.deadLift) + parseInt(preData.squat) + parseInt(newvalue - preData[id]);
        } else {
            return parseInt(preData.benchPress) + parseInt(preData.deadLift) + parseInt(preData.squat);
        }
    }

    const onSubmitHandler = async () => {
        event.preventDefault();

        await modifiyProfile({data : profileData});
    }

    if (loadingGet || loadingPost) {
        return (
            <div>Loading...</div>
        )
    }

    if (errorGet || errorPost) {
        return (
            <div>Error occured...</div>
        )
    }

    return (
        <>
            <form action="POST" onSubmit={onSubmitHandler}>
                {/* 중량 */}
                <h2 className='mx-2 font-bold text-lg'>3대 중량</h2>
                <section className='flex justify-center m-2'>
                    <div className='flex flex-col items-center w-3/4'>
                        <div className='w-full flex justify-between items-center'>
                            <span>벤치프레스</span>
                            <span>
                                <input id='benchPress' type="number" placeholder="입력란"
                                    className="input input-ghost w-16" value={profileData.benchPress} onChange={handleChange} />
                                <span>kg</span>
                            </span>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span>데드리프트</span>
                            <span>
                                <input id='deadLift' type="number" placeholder="입력란"
                                    className="input input-ghost w-16" value={profileData.deadLift} onChange={handleChange} />
                                <span>kg</span>
                            </span>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span>스쿼트</span>
                            <span>
                                <input id='squat' type="number" placeholder="입력란"
                                    className="input input-ghost w-16" value={profileData.squat} onChange={handleChange} />
                                <span>kg</span>
                            </span>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span>총 중량</span>
                            <span>
                                <input id='totalWeight' type="number" placeholder="입력란"
                                    className="input input-ghost w-16" value={profileData.totalWeight} readOnly={true} />
                                <span>kg</span>
                            </span>
                        </div>
                    </div>
                </section>
                {/* 기타 */}
                <h2 className='mx-2 font-bold text-lg'>기타 필터</h2>
                <section className='flex justify-center m-2'>
                    <div className='flex flex-col items-center w-3/4'>
                        <div className='w-full flex justify-between items-center'>
                            <div>성별</div>
                            <div className='flex justify-between w-1/2'>
                                <label className="label cursor-pointer">
                                    <span className="label-text mr-2">남성</span>
                                    <input id='gender' type="radio" name="gender"
                                        className="radio checked:bg-blue-500" value='Male' checked={profileData.gender === 'Male'}
                                        onChange={handleChange} />
                                </label>
                                <label className="label cursor-pointer">
                                    <span className="label-text mr-2">여성</span>
                                    <input id='gender' type="radio" name="gender"
                                        className="radio checked:bg-red-500" value='Female' checked={profileData.gender === 'Female'}
                                        onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <span>나이</span>
                            <span>
                                <input id='age' type="number" min='1' max='100' placeholder="몇"
                                    className="input input-ghost w-16" onChange={handleChange} value={profileData.age} />
                                <span>살</span>
                            </span>
                        </div>
                    </div>
                </section>
                <div className='flex justify-center items-center'>
                    <button className='btn btn-sm btn-primary m-3' type='submit'>수정</button>
                    <button className='btn btn-sm btn-outline btn-neutral '><Link to="/mypage/list">이전</Link></button>
                </div>
            </form>
        </>
    );
}

export default Profile;