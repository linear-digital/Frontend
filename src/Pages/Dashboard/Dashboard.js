import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth/firebase.init";

import { Toaster, toast } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Profile from "./P/Profile";
import Feedback from "./P/Feedback";
import { useLocation } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
const Dashboard = () => {
  const [ratings, setRatings] = useState(5);
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(false);
  const postFeedback = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const newFeedback = {
      email: user?.email,
      ratings: ratings,
      message: message,
      name,
      photoURL:
        user?.photoURL ||
        "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png",
    };
    fetch("https://server-hazrat.vercel.app/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Thank you for your feedback");
        setReload(res);
        e.target.reset();
      }
    });
  };

  const [active, setActive] = useState("profile");
  const [feedback, setFeedback] = useState([]);
  const [isInclued, setInclude] = useState(false);
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const res = await fetch("https://server-hazrat.vercel.app/feedback");
      const data = await res.json();
      setFeedback(data?.data);
    })();
    if (location.pathname === "/dashboard") {
      setActive("profile");
    } else {
      setActive("Feedback");
    }
  }, [reload, location]);

  useEffect(() => {
    const isInclued = feedback?.filter((f) => f.email === user?.email);
    setInclude(isInclued);
  }, [feedback, user]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const resendMail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success("Email sent")
      })
  }

  return (
    <div className="h-screen overflow-y-auto">
      <Toaster />
      <section className="flex justify-between h-full">
        <Sidebar active={active} setActive={setActive} />

        <section className="flex justify-center py-10 h-auto w-full">
          <UpdateModal
            setReload={setReload}
            edit={edit}
            data={id}
            setEdit={setEdit}
          />
          {active === "profile" && <Profile />}
          {active === "Feedback" && (
            <div className="w-full p-5 overflow-y-auto h-auto">
              {isInclued.length === 0 ? (
                <div>
                  {user.emailVerified || user?.providerData[0]?.providerId !== "password" ? (
                    <form
                      className="p-6 mx-auto rounded-lg max-w-lg  w-full"
                      onSubmit={postFeedback}
                    >
                      <h1 className="text-indigo-600 text-center mb-5 text-2xl">
                        Write a Feedback
                      </h1>
                      <div className="avatar mb-5">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={
                              user?.photoURL ||
                              "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <Rating
                          name="simple-controlled"
                          value={ratings}
                          onChange={(event, newValue) => {
                            setRatings(newValue);
                          }}
                        />
                      </div>
                      <h2>
                        <strong>Email : </strong> {user?.email}
                      </h2>
                      <input
                        name="name"
                        defaultValue={user?.displayName}
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full mt-3"
                      />
                      <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        className="textarea textarea-bordered w-full mt-5"
                        placeholder="Write your feedback"
                      ></textarea>
                      <button type="submit" className="btn mt-2 btn-primary">
                        Submit
                      </button>
                    </form>
                  ) : (
                    <div className="py-5 flex flex-col justify-center items-center">
                      <h1 className="text-center text-white text-2xl font-semibold">
                        Please Check Your Mail And Verified Your Email

                      </h1>
                      <div className="mt-5">
                        <button
                          onClick={resendMail}
                          className="btn btn-primary">Resend Mail</button>
                        <button
                          onClick={() => {
                            window.location.reload()
                          }}
                          className="btn btn-success ml-3 text-white">I Already Verified</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <h1 className="text-center text-white text-2xl">
                  You Have Already Submitted Thanks For Your Feedback
                </h1>
              )}
              <Feedback
                setData={setId}
                setEdit={setEdit}
                changes={reload}
                setChanges={setReload}
              />
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;

const UpdateModal = ({ data, edit, setEdit, setReload }) => {
  const [ratings, setRatings] = useState(5);
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const postFeedback = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const newFeedback = {
      email: data?.email,
      ratings: ratings,
      message: message,
      name,
      photoURL: data.photoURL,
    };
    fetch(`https://server-hazrat.vercel.app/feedback/${data._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Feedback Updated");
        setEdit(false);
        setReload(res);
      }
    });
  };
  return (
    <div style={{ zIndex: 1500 }} className=" cursor-text">
      <dialog id="my_modal_3" className={`modal ${edit && "modal-open"}`}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setEdit(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
            >
              ✕
            </button>
          </form>
          <form
            className=" p-6 mx-auto rounded-lg max-w-lg  w-full"
            onSubmit={postFeedback}
          >
            <h1 className="text-indigo-600 text-center mb-5 text-2xl">
              Write a Feedback
            </h1>
            <div className="avatar mb-5">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <Rating
                name="simple-controlled"
                value={data.ratings}
                onChange={(event, newValue) => {
                  setRatings(newValue);
                }}
              />
            </div>
            <h2>
              <strong>Email : </strong> {data?.email}
            </h2>
            <input
              name="name"
              defaultValue={data?.name}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full mt-3"
            />
            <textarea
              defaultValue={data?.message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea textarea-bordered w-full mt-5"
              placeholder="Write your feedback"
            ></textarea>
            <button type="submit" className="btn mt-2 btn-primary">
              Update
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
