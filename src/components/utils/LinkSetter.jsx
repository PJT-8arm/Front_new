import { useResolvedPath, useMatch } from "react-router-dom";
import { Link } from "react-router-dom";

// Link를 만드는 함수
function LinkSetter({ goto, icon, name, addedClassName }) {

    // localhost:3000 제외한 path 가져오기
    const resolvedPath = useResolvedPath(goto);

    // 가져온 패스가 일치하는지 확인
    const isActive = useMatch({ path: resolvedPath.pathname + "/*"});
    // isActive가 Null이면 "", 아니면 active
    return (
        <Link to={goto} className={addedClassName +(isActive ? " active" : "")}>
            {icon}{name}
        </Link>
    )
}

export default LinkSetter;