"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

function DetailPage({ params }) {
  const [timer, setTimer] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [update_at, setUpdate_at] = useState("");
  const router = useRouter();
  const titleInputRef = useRef(null);
  const bodyInputRef = useRef(null);

  async function updateData(params, title, body) {
    const id = params.id;
    try {
      const response = await fetch(
        `https://api-notes-phi.vercel.app/api/notes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  }

  useEffect(() => {
    getData(params);
    titleInputRef.current.focus();
  }, [params]);

  async function getData(params) {
    const response = await fetch(
      `https://api-notes-phi.vercel.app/api/notes/${params.id}`
    );
    const { data } = await response.json();
    setTitle(data.rows[0].title);
    setBody(data.rows[0].body);
    setUpdate_at(data.rows[0].updated_at);

    return data;
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      bodyInputRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateData(params, title, body);
    router.refresh();
    setShowAlert(true);

    const alertTimer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    setTimer(alertTimer);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    clearTimeout(timer);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `https://api-notes-phi.vercel.app/api/notes/delete/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Note deleted successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Delete failed: ", error.message);
    }
  };

  const timeStampToDate = (timestampString) => {
    const date = new Date(timestampString);
    const currDate = new Date();

    const diffInMilliseconds = currDate - date;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    if (diffInDays < 1) {
      // Kurang dari 24 jam, tampilkan jam
      return date.toLocaleString("id-ID", { timeStyle: "short" });
    } else if (diffInDays < 365) {
      // Lebih dari 1 hari tapi kurang dari 1 tahun, tampilkan tanggal dan bulan
      return date.toLocaleString("id-ID", { day: "numeric", month: "long" });
    } else {
      // Lebih dari 1 tahun, tampilkan tanggal, bulan, dan tahun
      return date.toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <section className="w-full">
      {deleteConfirm && (
        <div>
          <div className="bg-gray-900  w-80 md:w-[900px] md:h-[400px] mx-auto text-white p-3 px-5 rounded-md mb-4 flex flex-col items-center justify-center absolute top-1/3 left-1/2 md:top-1/2 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ease-in-out duration-150 z-50 md:border-4  md:border-black ">
            <p className="text-sm md:text-2xl mb-7">
              Are you sure you want to delete this note?
            </p>
            <div className="gap-9 mt-6 hidden md:flex">
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 p-2 border-2 border-red-600 hover:border-red-700 rounded-md"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirm(false)}
                className="text-white hover:text-slate-400 p-2 border-2 border-white hover:border-slate-400 rounded-md"
              >
                Cancel
              </button>
            </div>
            <div className="flex gap-9 mt-6 md:hidden">
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-500 p-2 "
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirm(false)}
                className="text-white p-2 "
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="w-full h-[calc(100vh-80px)] bg-black opacity-50 absolute"></div>
        </div>
      )}
      <div className="max-w-[1240px] px-4 mx-auto py-5 md:py-10">
        {/* Alert */}

        {showAlert && (
          <div className="bg-green-500 w-[300px] md:w-[400px] text-sm md:text-lg text-white p-3 px-5 rounded-md mb-4 flex items-center justify-between fixed top-12  md:right-20">
            <p>{message}</p>
            <button
              className="text-white p-2 border-2 border-white rounded-md hover:bg-green-600 hidden md:block"
              onClick={handleAlertClose}
            >
              Close
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-bold text-xl md:text-3xl focus:outline-none border-b-2 pb-2"
            placeholder="Title"
            ref={titleInputRef}
            onKeyDown={handleTitleKeyDown}
          />

          <p>
            <span className="text-gray-500 font-bold">Last updated at: </span>
            {timeStampToDate(update_at)}
          </p>

          <textarea
            placeholder="Body"
            id="body"
            name="body"
            cols="30"
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="text-md  md:text-xl focus:outline-none h-96 md:h-[600px] resize-none mt-5"
            ref={bodyInputRef}
          />

          <div className="flex justify-end mt-4 gap-5">
            <Link
              href="/"
              className="py-1 px-2 md:py-2  md:px-4 rounded-sm bg-blue-500 text-white font-[700] hover:bg-blue-600 transition-all duration-75 ease-in-out focus:bg-blue-600"
            >
              <button type="button">Back</button>
            </Link>
            <button
              type="button"
              className="py-1 px-2 md:py-2  md:px-4 rounded-sm bg-red-500 text-white font-[700] hover:bg-red-600 transition-all duration-75 ease-in-out focus:bg-red-600"
              onClick={() => setDeleteConfirm(true)}
            >
              Delete
            </button>
            <button
              type="submit"
              className="py-1 px-2 md:py-2  md:px-4 rounded-sm bg-green-500 text-white font-[700] hover:bg-green-600  transition-all duration-75 ease-in-out "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DetailPage;
