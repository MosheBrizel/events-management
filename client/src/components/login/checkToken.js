import axios from "axios";
import { useNavigate } from "react-router-dom";
import urlPage from "../../../url/urlPath";


export default function tokencheck() {
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("userToken");

  if (!localStorageToken) {
    navigate("/signin");
  } else {
    res()
  }
  const res = async () => {
    try {
      const response = await axios.post(urlPage +"users/token", localStorageToken);
      if (response.status == 200) {
        navigate("/");
        return localStorageToken
      } else {
        navigate("/signin");
        return false
      }
    } catch (error) {
      navigate("/signin");
      return false
    }
  };
}
