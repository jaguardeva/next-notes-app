import React from "react";
import Link from "next/link";

export default function Button(props) {
  const { title, link, classname = "bg-blue-500", onClick = () => {} } = props;

  return (
    <>
      {link ? (
        <Link
          href={link}
          className={`py-2 px-4 rounded-sm text-white font-[700] hover:bg-blue-600 transition-all duration-75 ease-in-out focus:bg-blue-600 ${classname} `}
        >
          {title}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`md:py-2 md:px-4 rounded-sm text-white font-[700] hover:bg-blue-600 transition-all duration-75 ease-in focus:bg-blue-600 ${classname}`}
        >
          {title}
        </button>
      )}
    </>
  );
}
