"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const API_ENDPOINT = "https://api-notes-phi.vercel.app/api/notes";

export default function AddNotePage() {
  const [text, setText] = useState("");
  const bodyInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleKeyDown = ({ key, target: { selectionStart, selectionEnd } }) => {
    if (key === "Tab") {
      setText(
        (prevText) =>
          prevText.substring(0, selectionStart) +
          "\t" +
          prevText.substring(selectionEnd)
      );
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      bodyInputRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const body = bodyInputRef.current.value;

    try {
      const response = await fetch(API_ENDPOINT, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }
    } catch (error) {
      console.error(error.message);
    }

    router.push("/");
    router.refresh();
  };

  return (
    <section className="w-full">
      <div className="max-w-[1240px] px-4 mx-auto pt-5 md:py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-xl md:text-2xl font-bold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="border border-gray-300 p-4 rounded-sm"
              onKeyDown={handleTitleKeyDown}
              ref={titleInputRef}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="text-xl md:text-2xl font-bold">
              Body
            </label>
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="10"
              placeholder="Body"
              className="border border-gray-300 rounded-md p-4 h-96 md:h-[500px] resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={bodyInputRef}
            ></textarea>
          </div>
          <div className="flex gap-4 justify-end">
            <Button
              title="Cancel"
              link="/"
              classname="bg-red-500 hover:bg-red-600"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
