import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { memo, useState } from "react";

export const useSignOut = () => {
  
  const { toast } = useToast();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const signOut = () => {
    (async () => {
      try {
        console.log('got it');
        setSignOutLoading(true);
        const response = await axios.post("/api/v1/users/logout");
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        if (response.status) {
          toast({
            title: "Logg-Out successfull. . . . .!",
            description: response.data.message,
          });
        }
      } catch (error: any) {
        toast({
          title: "Logg-Out Failed. . . . .!",
          description: error.message,
          variant:'destructive'
        });
        console.log(error.message);
      }
    })();
    setTimeout(() => {
        setSignOutLoading(false)
    }, 3000);
  };
  return { signOutLoading, signOut };
};
