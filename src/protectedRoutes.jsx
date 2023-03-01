import { Navigate } from "react-router-dom"
import { userAuth } from "./API"

const protectedRoutes = ({ children }) => {

    const token = localStorage.getItem("jwt")

    if (token) {
        userAuth(token).then((result) => {
            const status = result.data.userData.status
            if(status == 'Blocked'){
                localStorage.clear();
                window.location.reload()
            }
        })
    }


    if (!token) {
        return <Navigate to={"/login"} replace={true}></Navigate>
    }
    return children
}

export default protectedRoutes