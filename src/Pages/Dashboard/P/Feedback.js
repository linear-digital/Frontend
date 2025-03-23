import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { auth } from "../../Auth/firebase.init";

const Feedback = ({ changes, setChanges, setEdit, setData }) => {
  const [feedback, setFeedback] = useState([]);
  const [reload, setReload] = useState();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://server-hazrat.vercel.app/feedback");
      const data = await res.json();
      setFeedback(data?.data);
    })();
  }, [reload, changes]);
  const deleteFeedback = (id) => {
    fetch(`https://server-hazrat.vercel.app/feedback/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Feedback Deleted");
        setReload(res);
        setChanges(res);
      }
    });
  };
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return (
    <div className="mt-24 grid md:grid-cols-2 overflow-y-auto lg:grid-cols-4 gap-5 h-auto">
      {feedback?.map((f) => (
        <div
          key={f._id}
          className="card card-feedback w-full bg-[#1a2747] shadow-xl"
        >
          <div className="card-body bg-[#1a2747]">
            <div className="avatar mb-5">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={f.photoURL} alt="" />
              </div>
            </div>
            <h2 className="card-title text-xl">{f.email}</h2>
            <Rating
              name="simple-controlled"
              value={f.ratings}
              onChange={(event, newValue) => {}}
            />

            <p>{f.message.slice(0, 60)}</p>

            {user?.email === "hazrataliein@gmail.com" ||
            user?.email === "programmer.hazratali@gmail.com" ||
            user?.email === "iushazratali@gmail.com" ||
            user?.email === "hazratalisoft@gmail.com" ||
        
            user?.email === f.email ? (
              <div>
                <button
                  className="btn btn-primary text-white btn-sm mt-3"
                  onClick={() => {
                    setEdit(true);
                    setData(f);
                  }}
                >
                  Update
                </button>
                <button
                  disabled={
                    !(
                      user?.email === "hazrataliein@gmail.com" ||
                      user?.email === "programmer.hazratali@gmail.com" ||
                      user?.email === "iushazratali@gmail.com" ||
                      user?.email === "hazratalisoft@gmail.com" 
                    )
                  }
                  className="btn btn-danger bg-red-500 text-white btn-sm mt-3 ml-3"
                  onClick={() => deleteFeedback(f._id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
