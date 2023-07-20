import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Breadcrumbs from "../components/breadcrumbs";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

function Doctor() {
  const [loading, setloading] = useState(true);

  const [datadoctor, setdatadoctor] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "doctor"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const doctors = [];
      querySnapshot.forEach((doc) => {
        doctors.push({ ...doc.data(), id_doc: doc.id });
      });
      setdatadoctor(doctors);
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
                  Hari Praktek
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
                      <td className="px-6 py-4">{item.practice[0].day}</td>
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

export default Doctor;
