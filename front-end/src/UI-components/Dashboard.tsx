import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Video from "./Video";
import { PlatForm } from "./PlatForm";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLoggedUser } from "@/Redux/Slice/SignIn";

const Dashboard = () => {
  const signOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearLoggedUser());
    navigate("/");
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);
  const signUpState = useSelector((state) => state);
  console.log("Dashboard", signUpState);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/dashboard${searchQuery ? "/search-video?" : ""}`,
          {
            params: {
              search: searchQuery,
            },
          }
        );
        console.log(response.data);

        setResult(response.data);
        setError("");
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data);
        } else if (error.request) {
          setError("No response received from server.");
        } else {
          setError("Error: " + error.message);
        }
      }
    })();
    console.log(error);
  }, [searchQuery]);
  return (
    <div className="min-h-screen w-full grid relative place-items-center mx-auto">
      <div className="min-h-screen w-full p-2 grid place-items-center">
        <div className="flex w-full justify-between items-center absolute top-7">
          <PlatForm />
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search Here....."
            className="max-w-[500px] mr-7 md:mx-4 relative w-full min-w-[250px] h-8 text-xl outline-none border-white bg-transparent text-white border-[1px] rounded-xl pl-2 leading-8 "
          />
          <div className="hidden md:block mr-4 lg:mr-12">
            {!localStorage.getItem("accessToken") ? (
              <button
                onClick={() => navigate("signin")}
                className="text-[15px] mx-1 font-semibold bg-blue-600 px-3 py-1 rounded-2xl text-white"
              >
                Sign-In
              </button>
            ) : (
              <button
                onClick={() => signOut()}
                className="text-[15px] mx-1 font-semibold bg-red-600 px-3 py-1 rounded-2xl text-white"
              >
                Sign-Out
              </button>
            )}
          </div>
        </div>
        <div className="mt-10 w-full min-h-auto grid place-items-center md:mt-16">
          {result.length > 0 ? (
            <ul
              className="mt-8 grid place-items-start space-y-2 justify-center w-full min-h-screen 
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 md:m-3 md:min-w-1/3"
            >
              {result.map((video: any) => {
                return (
                  <Video
                    key={video.videoFile}
                    title={video.title}
                    avatar={video.avatar}
                    thumbnail={video.thumbnail}
                    link={video.videoFile}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="text-3xl text-center text-white">
              <Loader2 className="text-white text-8xl text-center animate-spin mt-10" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
