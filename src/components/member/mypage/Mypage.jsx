import React from 'react';
import { mypageDetails } from '../../../openapi/orval_query/api/mypage-controller/mypage-controller';

function Mypage(props) {
    const details = mypageDetails()
    console.log(details);

    return (
        <div>
            mypage
        </div>
    );
}

export default Mypage;