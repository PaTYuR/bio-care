import React, { useEffect, useState } from "react";

function Breadcrumbs() {
  const path = window.location.pathname;

  const [date, setDate] = useState("");

  useEffect(() => {
    let offset = 420;
    let offsetMillis = offset * 60 * 1000;
    let today = new Date();
    let millis = today.getTime();
    let timeZoneOffset = today.getTimezoneOffset() * 60 * 1000;
    let pst = millis - offsetMillis;
    let currentDate = new Date(pst);
    let d = new Date(currentDate);

    let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    setDate(
      days[d.getDay()] +
        " " +
        d.getDate() +
        "-" +
        d.getMonth() +
        "-" +
        d.getFullYear()
    );
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-0">
      <div
        className="flex py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 container mx-auto md:px-6 lg:px-8 xl:px-0 my-4"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3 ml-4">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {path === "/practice-schedule"
                  ? `Jadwal Praktek - ${date}`
                  : path === "/doctor"
                  ? "Data Dokter"
                  : path === "/patient"
                  ? "Data Pasien"
                  : "Dashboard Admin"}
              </span>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Breadcrumbs;
