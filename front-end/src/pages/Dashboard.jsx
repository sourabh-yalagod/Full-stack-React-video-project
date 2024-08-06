import axios from "axios";
import { useEffect, useState } from "react";
import TotalFigures from "@/components/TotalFigures";
import Performance from "@/components/Performance";
import { Eye, NotebookPen, ThumbsUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/Redux/api/axiosInstance";

const Dashboard = () => {
  const [apiResponse, setApiResponse] = useState("");
  const handleDashboard = async () => {
    const response = await axiosInstance.get(`/api/v1/dashboard`);
    return response?.data;
  };
  const [skeletons] = useState(Array(3).fill(null));
  const { data, isPending, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: handleDashboard,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      console.log("data : ", data);
    },
  });
  useEffect(() => {
    setApiResponse(data?.data);
  }, [data]);

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

  if (isPending) {
    return skeletons.map((_, index) => {
      return (
        <div
          key={index}
          className="min-w-[310px] my-5 w-full grid gap-3 border-slate-500 dark:border-slate-200 border rounded-xl text-slate-800 dark:text-slate-200 p-3 sm:grid-cols-2 md:grid-cols-3"
        >
          <Skeleton className="h-[150px] bg-slate-500 w-full rounded-xl" />
          <Skeleton className="h-[150px] bg-slate-500 w-full rounded-xl" />
          <Skeleton className="h-[150px] bg-slate-500 w-full rounded-xl" />
        </div>
      );
    });
  }
  return (
    <div className="min-h-screen pl-4 px-4 dark:bg-black transition-all space-y-10">
      <TotalFigures data={apiResponse?.AggregateFigure} />
      <Performance data={weeklyPerformance ?? ""} />
      <Performance data={monthlyPerformance ?? ""} />
      <Performance data={yearlyPerformance ?? ""} />
    </div>
  );
};

export default Dashboard;
