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

const Header = () => {
  const user = JSON.parse(localStorage?.getItem("user"));

  useEffect(() => {}, []);

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
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img src="/logo.svg" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-5 mr-2">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Add Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
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
