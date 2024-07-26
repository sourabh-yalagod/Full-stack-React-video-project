import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const signOut = () => {
    (async () => {
      // Cookies.remove("accessToken");
      // Cookies.remove("refreshToken");
      try {
        setSignOutLoading(true);
        const response = await axios.post("/api/v1/users/logout");
        if (response) {
          toast({
            title: "Logg-Out successfull. . . . .!",
            description: response.data.message,
            duration:1500
          });
        }
      } catch (error) {
        toast({
          title: "Logg-Out Failed. . . . .!",
          description: error.message,
          variant: "destructive",
          duration:1500
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
