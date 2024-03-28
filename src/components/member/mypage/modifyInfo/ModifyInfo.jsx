import React, { useState, useRef, useEffect } from 'react';
import { useMypageDetails, useMypageModifyDetails } from '../../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { Form, Link } from 'react-router-dom';
import Upload from '../../../file/Upload';

function ModifyInfo(props) {
    const { data: memberDto, isLoading: loadingGet, isError: ErrorGet } = useMypageDetails();
    const { mutate: postData, isLoading: loadingPost, isError: ErrorPost } = useMypageModifyDetails()
    // console.log("memberDto : ", memberDto);
    // console.log("memberDto.name : ", memberDto.name);
    // console.log("refname:", refName.current.value);
    const [imgUrl, setImgUrl] = useState();


    const [formdata, setFormdata] = useState({
        username: "",
        name: "",
        nickname: "",
        imgUrl: "",
        postPassword: "",
        prePassword: "",
        address: "",
    });

    useEffect(() => {
        // Daum 우편번호 스크립트를 동적으로 로드하는 부분
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.body.appendChild(script);
    }, []);
    
    // Daum 우편번호 서비스를 실행하는 함수
    const sample5_execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                // 최종 주소 변수
                var addr = data.address;
                // 주소 정보를 formdata에 설정
                setFormdata({...formdata, address: addr});
            }
        }).open();
    };

    useEffect(() => {
        if (memberDto) {
            setFormdata({
                username: memberDto.username || "", // memberDto에 username이 없다면 빈 문자열을 사용
                imgUrl: memberDto.imgUrl || "",
                name: memberDto.name || "",
                nickname: memberDto.nickname || "",
                postPassword: "",
                prePassword: "",
                address: memberDto.address || "", // memberDto에 address가 없다면 빈 문자열을 사용
            })
        }
    }, [memberDto])

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormdata(preFormdata => ({
            ...preFormdata,
            [id]: value,
        }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        console.log('modify',imgUrl);
        const memberModifyDto = {
            imgUrl: imgUrl,
            name: formdata.name,
            nickname: formdata.nickname,
            postPassword: formdata.postPassword,
            prePassword: formdata.prePassword,
            username: formdata.username,
            address: formdata.address,
        }

        await postData({ data: memberModifyDto });
    }

    if (loadingGet || loadingPost) {
        return (
            <div>Loading...</div>
        )
    }

    if (ErrorGet || ErrorPost) {
        return (
            <div>Error...</div>
        )
    }

    return (
        <>
        <h1 className='font-bold text-lg m-2'>회원정보 수정</h1>
            <form className='m-2' onSubmit={onSubmitHandler}>
                <label className="input input-bordered flex items-center gap-2 mt-2">
                    아이디
                    <div className="grow">{formdata.username}</div>
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-2">
                    변경전 비밀번호
                    <input type="password" className="grow" placeholder="******" id='prePassword' value={formdata.prePassword} onChange={handleChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-2">
                    변경후 비밀번호
                    <input type="password" className="grow" placeholder="******" id='postPassword' value={formdata.postPassword} onChange={handleChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-2">
                    이름
                    <input type="text" className="grow" placeholder="이름을 적어주세요." id='name' value={formdata.name} onChange={handleChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-2">
                    닉네임
                    <input type="text" className="grow" placeholder="닉네임을 적어주세요" id='nickname' value={formdata.nickname} onChange={handleChange} />
                </label>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex flex-row flex-grow items-center gap-2 input input-bordered">
                        <span className="whitespace-nowrap">주소</span>
                        <input type="text" placeholder="주소를 적어주세요" id='address' className="w-full" value={formdata.address} onChange={handleChange} />
                    </div>
                    <button onClick={sample5_execDaumPostcode} className="btn">주소 검색</button>
                </div>
                <Upload setImgUrl={setImgUrl}/>
                <div className='flex justify-center items-center'>
                    <button className='btn btn-sm btn-primary m-3' type='submit'>수정</button>
                    <button className='btn btn-sm btn-outline btn-neutral '><Link to="/mypage/list">이전</Link></button>
                </div>
            </form>
        </>
    );
}

export default ModifyInfo;