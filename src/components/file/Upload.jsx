import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
import './Upload.css';

const Upload = ({ setImgUrl }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const inputRef = useRef([]);

    const getPresignedUrl = async (fileName) => {
        const params = new URLSearchParams({
            prefix: 'profileImg', // 파일 경로
            fileName: fileName,
        });

        try {
            const response = await axiosInstance({
                url: '/api/file/upload/url',
                method: 'get',
                params: params
              });

            return response.preSignedUrl; // 사전 서명된 URL 반환
        } catch (error) {
            console.error('Error fetching pre-signed URL:', error);
            return null;
        }
    };

    const uploadOnS3 = async () => {

        const preSignedUrl = await getPresignedUrl(imageFile.name);

        if (!preSignedUrl) return; // 사전 서명된 URL을 가져오는데 실패한 경우

        try {
            // 사전 서명된 URL을 사용하여 파일을 S3에 업로드
            await axios.put(preSignedUrl, imageFile, {
                headers: {
                    'Content-Type': imageFile.type, // 파일의 MIME 타입 지정
                },
            });

            const cleanUrl = preSignedUrl.split('?')[0]; // '?'를 기준으로 분리하고 첫 번째 부분 선택

            // 부모 컴포넌트에 깨끗한 URL 업데이트
            setImgUrl(cleanUrl);
        } catch (error) {
            console.error('Error uploading file to S3:', error);
        }
    };

    const uploadOnBrowser = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop();

        // 확장자 제한
        if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
            alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            // 이미지 경로 선언
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (!imageFile) return;

        uploadOnS3();
    }, [imageFile])

    return (
        <>
            {imageSrc && <div className='profile-uploading-img'>
                <img
                    className='rounded-full'

                    src={imageSrc}
                />
            </div>}
            <input className='file-uploading'
                accept="image/*"
                multiple type="file"
                ref={el => (inputRef.current[0] = el)}
                onChange={e => uploadOnBrowser(e)}
            />
        </>
    )
};

export default Upload;