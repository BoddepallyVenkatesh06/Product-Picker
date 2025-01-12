import { useSelector } from "react-redux";

export default function userAuth() {
    const { user, token } = useSelector((state: any) => state.auth);

    if (user && token) {
        return true;
    } else {
        return false;
    }
}