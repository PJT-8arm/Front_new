import React, { useState, useRef, useEffect } from 'react';
import { useMypageDetails, useMypageModifyDetails } from '../../../../openapi/orval_query/api/mypage-controller/mypage-controller';
import { Form } from 'react-router-dom';

function ModifyInfo(props) {
    const { data: memberDto, isLoading : loadingGet, isError: ErrorGet } = useMypageDetails();
    const {mutate: postData, isLoading : loadingPost, isError : ErrorPost } = useMypageModifyDetails()
    // console.log("memberDto : ", memberDto);
    // console.log("memberDto.name : ", memberDto.name);
    // console.log("refname:", refName.current.value);

    const [formdata, setFormdata] = useState({
        username: "",
        name: "",
        nickname: "",
        imgUrl: "",
        postPassword: "",
        prePassword: "",
    });

    useEffect(() => {
        if (memberDto) {
            setFormdata({
                username: memberDto.username,
                imgUrl: memberDto.imgUrl,
                name: memberDto.name,
                nickname: memberDto.nickname,
                postPassword: "",
                prePassword: "",
            })
        }
    }, [memberDto])

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormdata(preFormdata => ({
            ...preFormdata,
            [id] : value,
        }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const memberModifyDto = {
            imgUrl: formdata.imgUrl,
            name: formdata.name,
            nickname: formdata.nickname,
            postPassword: formdata.postPassword,
            prePassword: formdata.prePassword,
            username: formdata.username,
        }
        
        await postData({data : memberModifyDto});
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
            <form action="POST" onSubmit={onSubmitHandler}>
                <label className="input input-bordered flex items-center gap-2">
                    아이디
                    <div className="grow">{formdata.username}</div>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    변경전 비밀번호
                    <input type="password" className="grow" placeholder="******" id='prePassword' value={formdata.prePassword} onChange={handleChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    변경후 비밀번호
                    <input type="password" className="grow" placeholder="******" id='postPassword' value={formdata.postPassword} onChange={handleChange}/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    이름
                    <input type="text" className="grow" placeholder="이름을 적어주세요." id='name' value={formdata.name} onChange={handleChange}/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    닉네임
                    <input type="text" className="grow" placeholder="닉네임을 적어주세요" id='nickname' value={formdata.nickname} onChange={handleChange}/>
                </label>
                <button type='submit'>수정</button>
            </form>
        </>
    );
}

export default ModifyInfo;