import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Breadcrumbs from "../components/breadcrumbs";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

function Schedule() {
  const [loading, setloading] = useState(true);

  const [datadoctor, setdatadoctor] = useState([]);

  const [datanurse, setdatanurse] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "doctor"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const doctors = [];
      querySnapshot.forEach((doc) => {
        doctors.push({ ...doc.data(), id_doc: doc.id });
      });
      let offset = 420;
      let offsetMillis = offset * 60 * 1000;
      let today = new Date();
      let millis = today.getTime();
      let timeZoneOffset = today.getTimezoneOffset() * 60 * 1000;
      let pst = millis - offsetMillis;
      let currentDate = new Date(pst);
      let d = new Date(currentDate);

      let days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];

      const findById = (day) =>
        doctors.filter((x) => x.practice.some((item) => day === item.day));
      setdatadoctor(findById(days[d.getDay()]));
      setloading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "nurse"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nurses = [];
      querySnapshot.forEach((doc) => {
        nurses.push({ ...doc.data(), id_doc: doc.id });
      });
      setdatanurse(nurses);
      setloading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="container mx-auto py-1 md:py-2 lg:py-4 xl:py-6 px-4 md:px-6 lg:px-8 xl:px-0">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama Dokter
                </th>
                <th scope="col" className="px-6 py-3">
                  No. SIP Dokter
                </th>
                <th scope="col" className="px-6 py-3">
                  Perawat
                </th>
                <th scope="col" className="px-6 py-3">
                  No. SIP Perawat
                </th>
                <th scope="col" className="px-6 py-3">
                  Jam Praktek
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Loading...
                  </td>
                </tr>
              ) : datadoctor.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                datadoctor.flatMap((item, index) => (
                  <>
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.number_sip}</td>
                      <td className="px-6 py-4">
                        {item.id_nurse === undefined
                          ? "-"
                          : [datanurse.find((o) => o.id_doc === item.id_nurse)]
                              .map((item, index) => item.name)
                              .toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {item.id_nurse === undefined
                          ? "-"
                          : [datanurse.find((o) => o.id_doc === item.id_nurse)]
                              .map((item, index) => item.number_sip)
                              .toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {item.practice[0].start} - {item.practice[0].end}
                      </td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Schedule;
