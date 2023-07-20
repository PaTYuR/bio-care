import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Breadcrumbs from "../components/breadcrumbs";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

function Patient() {
  const [loading, setloading] = useState(true);

  const [datapatient, setdatapatient] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "patient"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const patients = [];
      querySnapshot.forEach((doc) => {
        patients.push({ ...doc.data(), id_doc: doc.id });
      });
      setdatapatient(patients);
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
                  Nama Pasien
                </th>
                <th scope="col" className="px-6 py-3">
                  Penyakit
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
              ) : datapatient.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                datapatient.flatMap((item, index) => (
                  <>
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.desease}</td>
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

export default Patient;
