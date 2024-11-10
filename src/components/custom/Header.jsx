import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage?.getItem("user"));

  useEffect(() => {}, [user]);

  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      getUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
      });
  };

  return (
    <div className="py-2 px-2 shadow-sm flex justify-between items-center sm:px-5">
      <Link to={"/"}>
        <img src="/logo.svg" />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-5 sm:mr-2">
            <Link to={"/create-trip"}>
              <Button
                variant="outline"
                className="px-[6px] rounded-full text-xs sm:text-base"
              >
                + Add Trip
              </Button>
            </Link>
            <Link to={"/my-trips"}>
              <Button
                variant="outline"
                className="px-[6px] rounded-full text-xs sm:text-base"
              >
                My Trips
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback>
                    {user?.given_name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit mt-4 p-1">
                <Button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign In to the app with google authentication securely</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="size-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
