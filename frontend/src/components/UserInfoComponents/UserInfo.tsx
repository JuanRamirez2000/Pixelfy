import axios from "axios";
import { useQuery } from "react-query";

export default function UserInfo() {
  const { data, isLoading, error } = useQuery("userInfo", grabUserInfo);

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>An Error has occurred</p>
      </div>
    );
  console.log(data);
  return (
    <div>
      <p></p>
    </div>
  );
}

let grabUserInfo = async () => {
  const res = await axios.get("/api/userInfo");
  return res.data;
};
