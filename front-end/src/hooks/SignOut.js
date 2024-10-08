import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/Redux/api/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const signOut = () => {
    (async () => {
      try {
        setSignOutLoading(true);
        if (localStorage.getItem("token")) {
          const response = await axiosInstance.post(`/api/v1/users/logout`);
          if (response) {
            toast({
              title: "Logg-Out successfull. . . . .!",
              description: response.data.message,
              duration: 1500,
            });
          }
          localStorage.removeItem("token");
        } else {
          toast({
            title: "user has already logged-out.",
            description: error.message,
            variant: "destructive",
            duration: 1500,
          });
        }
      } catch (error) {
        toast({
          title: "Internal server Error",
          description: error.message,
          variant: "destructive",
          duration: 1500,
        });
      }
    })();
    setTimeout(() => {
      setSignOutLoading(false);
      navigate("/");
    }, 1000);
  };
  return { signOutLoading, signOut };
};
