import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";

async function getData() {
  const res = await fetch("https://api-notes-phi.vercel.app/api/notes", {
    cache: "no-store",
    // next: {
    //   revalidate: 30,
    // },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const sortedData = data.data.sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );
  return sortedData;
}

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

// Contoh pemanggilan fungsi
const timestampString = new Date().toISOString();
console.log(timeStampToDate(timestampString));

export default async function Home() {
  const data = await getData();

  return (
    <>
      <section className="w-full   ">
        <div className="max-w-[1240px] pt-5 md:py-10 px-4 mx-auto flex flex-col gap-5  lg:grid lg:grid-cols-2 lg:gap-4  ">
          {data.map((note, index) => (
            <Link
              href={`/detailPage/${note.id}`}
              key={index}
              className=" w-full h-[90px] md:h-[150px] lg:h-[170px] flex flex-col justify-center p-5  md:p-10 bg-gray-100 rounded-lg md:rounded-sm  lg:hover:outline outline-blue-500 lg:cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-xl lg:text-2xl w-[60%] md:w-[80%] font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {note.title}
                </h1>
                <p className="text-sm md:text-md text-gray-500">
                  {timeStampToDate(note.updated_at)}
                </p>
              </div>

              <p className="text-sm md:text-lg overflow-ellipsis overflow-hidden whitespace-nowrap font-medium md:mt-3">
                {note.body.length > 100
                  ? note.body.substring(0, 100) + "..."
                  : note.body}
              </p>
            </Link>
          ))}
        </div>
        <Link href="/addNote">
          <IoIosAddCircle className=" fixed right-8 bottom-24 md:right-24 md:bottom-24 text-blue-500 hover:text-blue-600 w-14 h-14 md:w-[80px] md:h-[80px]"></IoIosAddCircle>
        </Link>
      </section>
    </>
  );
}
