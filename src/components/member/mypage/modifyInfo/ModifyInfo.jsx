import React from 'react';
import { useMypageDetails } from '../../../../openapi/orval_query/api/mypage-controller/mypage-controller';

function ModifyInfo(props) {
    const {data : memberDto, isLoading, isError} = useMypageDetails();
    console.log(memberDto);

    return (
        <div>
            modifyinfo
        </div>
    );
}

export default ModifyInfo;