import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/dashboard${
            searchQuery ? "/search-video?" : ""
          }`,
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
  }, [searchQuery]);

  return (
    <div className="min-h-screen w-screen grid place-content-center">
      <div className="min-h-screen w-full p-2 justify-center">
        <center>
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search Here....."
            className="max-w-[500px] w-full min-w-[300px] h-8 text-xl outline-none border-white border-[1px] rounded-xl pl-2 leading-8 mt-5"
          />
        </center>
        <div className="">
          {result.length > 0 ? (
            <ul className="mt-5 flex flex-wrap justify-center gap-5">
              {result.map((video: any) => {
                return (
                  <div className="bg-slate-900 min-w-[300px] max-w-[350px] hover:scale-105 rounded-[20px] transition-all overflow-hidden">
                    <video
                      poster={video.thumbnail}
                      key={video.videoFile}
                      controls
                      className=""
                      src={video.videoFile}
                    ></video>
                    <p className="text-white p-2">Title : {video.title}</p>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p className="text-3xl text-center text-white">No videos found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
