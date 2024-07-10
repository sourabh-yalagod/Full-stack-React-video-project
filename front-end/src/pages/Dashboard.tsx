import Hero from "@/components/Header/Hero";
import axios from "axios";
import { useEffect, useState } from "react";
import TotalFigures from "@/components/TotalFigures";
import Performance from "@/components/Performance";
import { Eye, NotebookPen, ThumbsUp } from "lucide-react";
const Dashboard = () => {
  const [error, setError]: any = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/dashboard`, {
          signal: signal,
        });
        setApiResponse(response?.data?.data);
        setError("");
      } catch (error: any) {
        setError("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      console.log("Dashboard  : ", apiResponse);
      controller.abort();
    };
  }, []);

  const weeklyPerformance = {
    likes: {
      text: "Likes",
      data: apiResponse?.performance?.weeklyPerformance?.weeklyLikes,
      icon: <ThumbsUp />,
    },
    comments: {
      text: "Comments",
      data: apiResponse?.performance?.weeklyPerformance?.weeklyComments,
      icon: <NotebookPen />,
    },
    views: {
      text: "Views",
      data: apiResponse?.performance?.weeklyPerformance?.weeklyViews,
      icon: <Eye />,
    },
    heading: "Weekly Statistics",
  };
  const monthlyPerformance = {
    likes: {
      text: "Likes",
      data: apiResponse?.performance?.monthlyPerformance?.monthlyLikes,
      icon: <ThumbsUp />,
    },
    comments: {
      text: "Comments",
      data: apiResponse?.performance?.monthlyPerformance?.monthlyComments,
      icon: <NotebookPen />,
    },
    views: {
      text: "Views",
      data: apiResponse?.performance?.monthlyPerformance?.monthlyViews,
      icon: <Eye />,
    },
    heading: "Monthly Statistics",
  };
  const yearlyPerformance = {
    likes: {
      text: "Likes",
      data: apiResponse?.performance?.yearlyPerformance?.yearlyLikes,
      icon: <ThumbsUp />,
    },
    comments: {
      text: "Comments",
      data: apiResponse?.performance?.yearlyPerformance?.yearlyComments,
      icon: <NotebookPen />,
    },
    views: {
      text: "Views",
      data: apiResponse?.performance?.yearlyPerformance?.yearlyViews,
      icon: <Eye />,
    },
    heading: "Yearly Statistics",
  };

  const time = new Date();
  console.log(time.toLocaleDateString());
  return (
    <div className="min-h-screen pl-4 px-4 dark:bg-slate-900 transition-all space-y-10">
      <TotalFigures data={apiResponse?.AggregateFigure} />
      <Performance data={weeklyPerformance ?? ""} />
      <Performance data={monthlyPerformance ?? ""} />
      <Performance data={yearlyPerformance ?? ""} />
    </div>
  );
};

export default Dashboard;
