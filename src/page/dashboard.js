import React, { useState, Fragment, useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import Breadcrumbs from "../components/breadcrumbs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

const day = [
  {
    id: 1,
    name: "Minggu",
  },
  {
    id: 2,
    name: "Senin",
  },
  {
    id: 3,
    name: "Selasa",
  },
  {
    id: 4,
    name: "Rabu",
  },
  {
    id: 5,
    name: "Kamis",
  },
  {
    id: 6,
    name: "Jumat",
  },
  {
    id: 7,
    name: "Sabtu",
  },
];

const time = [
  {
    id: "t0",
    name: "01:00",
  },
  {
    id: "t1",
    name: "02:00",
  },
  {
    id: "t2",
    name: "03:00",
  },
  {
    id: "t3",
    name: "04:00",
  },
  {
    id: "t4",
    name: "05:00",
  },
  {
    id: "t5",
    name: "06:00",
  },
  {
    id: "t6",
    name: "07:00",
  },
  {
    id: "t7",
    name: "08:00",
  },
  {
    id: "t8",
    name: "09:00",
  },
  {
    id: "t9",
    name: "10:00",
  },
  {
    id: "t10",
    name: "11:00",
  },
  {
    id: "t11",
    name: "12:00",
  },
  {
    id: "t12",
    name: "13:00",
  },
  {
    id: "t13",
    name: "14:00",
  },
  {
    id: "t14",
    name: "15:00",
  },
  {
    id: "t15",
    name: "16:00",
  },
  {
    id: "t16",
    name: "17:00",
  },
  {
    id: "t17",
    name: "18:00",
  },
  {
    id: "t18",
    name: "19:00",
  },
  {
    id: "t19",
    name: "20:00",
  },
  {
    id: "t20",
    name: "21:00",
  },
  {
    id: "t21",
    name: "22:00",
  },
  {
    id: "t22",
    name: "23:00",
  },
  {
    id: "t23",
    name: "24:00",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Dashboard() {
  const [loading, setloading] = useState(true);
  const [modalisopen, setisopen] = useState(false);
  const [tabindex, settabindex] = useState(0);

  const closeModal = async (e) => {
    e.preventDefault();
    setisopen(false);
  };

  const handleUpdateDataDoctor = async (e, x, y) => {
    e.preventDefault();
    const doctorref = doc(db, "doctor", y);

    // Set the "capital" field of the city 'DC'
    await updateDoc(doctorref, {
      id_nurse: x,
    })
      .then(() => {
        toast.success("Data dokter berhasil diperbarui", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setisopen(false);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error(error.code, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // Dokter
  const [namedoctor, setnamedoctor] = useState("");
  const [sipdoctor, setsipdoctor] = useState("");
  const [selecteddaypractice, setselecteddaypractice] = useState(day[1]);
  const [selectedtimestart, setselectedtimestart] = useState(time[0]);
  const [selectedtimeend, setselectedtimeend] = useState(time[0]);
  const [stateadddatadoctor, setstateadddatadoctor] = useState(false);
  const [datadoctor, setdatadoctor] = useState([]);

  const handleClickStateDoctor = (e) => {
    setstateadddatadoctor((stateadddatadoctor) => !stateadddatadoctor);
  };

  const handleChangeNameDoctor = (e) => {
    setnamedoctor(e.target.value);
  };

  const handleChangeSipDoctor = (e) => {
    setsipdoctor(e.target.value);
  };

  const handleFormDataDoctor = async (e) => {
    e.preventDefault();
    if (namedoctor === "") {
      toast.error("Nama dokter tidak boleh kosong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (sipdoctor === "") {
      toast.error("SIP tidak boleh kosong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await addDoc(collection(db, "doctor"), {
        name: namedoctor,
        number_sip: sipdoctor,
        practice: [
          {
            day: selecteddaypractice.name,
            start: selectedtimestart.name,
            end: selectedtimeend.name,
          },
        ],
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          toast.success("Data dokter berhasil ditambahkan", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toast.onChange((payload) => {
            if (payload.status === "removed") {
              setnamedoctor("");
              setsipdoctor("");
            }
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error(error.code, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  const handleDeleteDoctor = async (e) => {
    await deleteDoc(doc(db, "doctor", e))
      .then(() => {
        toast.success("Data dokter berhasil dihapus", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error(error.code, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

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

  // Perawat

  const [namenurse, setnamenurse] = useState("");
  const [sipnurse, setsipnurse] = useState("");
  const [stateadddatanurse, setstateadddatanurse] = useState(false);
  const [datanurse, setdatanurse] = useState([]);

  const handleClickStateNurse = (e) => {
    setstateadddatanurse((stateadddatadoctor) => !stateadddatadoctor);
  };

  const handleChangeNameNurse = (e) => {
    setnamenurse(e.target.value);
  };

  const handleChangeSipNurse = (e) => {
    setsipnurse(e.target.value);
  };

  const handleFormDataNurse = async (e) => {
    e.preventDefault();
    if (namenurse === "") {
      toast.error("Nama perawat tidak boleh kosong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (sipnurse === "") {
      toast.error("SIP tidak boleh kosong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await addDoc(collection(db, "nurse"), {
        name: namenurse,
        number_sip: sipnurse,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          toast.success("Data perawat berhasil ditambahkan", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toast.onChange((payload) => {
            if (payload.status === "removed") {
              setnamenurse("");
              setsipnurse("");
            }
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error(error.code, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  const handleDeleteNurse = async (e) => {
    await deleteDoc(doc(db, "nurse", e))
      .then(() => {
        toast.success("Data perawat berhasil dihapus", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error(error.code, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

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

  // Pasien

  const [namepatient, setnamepatient] = useState("");
  const [desease, setdesease] = useState("");
  const [stateadddatapatient, setstateadddatapatient] = useState(false);
  const [datapatient, setdatapatient] = useState([]);

  const handleClickStatePatient = (e) => {
    setstateadddatapatient((stateadddatapatient) => !stateadddatapatient);
  };

  const handleChangeNamePatient = (e) => {
    setnamepatient(e.target.value);
  };

  const handleChangeDesease = (e) => {
    setdesease(e.target.value);
  };

  const handleFormDataPatient = async (e) => {
    e.preventDefault();

    if (namepatient === "") {
      toast.error("Nama pasien tidak boleh kosong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (desease === "") {
      toast.error("Penyakit tidak boleh kosong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await addDoc(collection(db, "patient"), {
        name: namepatient,
        desease: desease,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          toast.success("Data pasien berhasil ditambahkan", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toast.onChange((payload) => {
            if (payload.status === "removed") {
              setnamepatient("");
              setdesease("");
            }
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error(error.code, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

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

  const handleDeletePatient = async (e) => {
    await deleteDoc(doc(db, "patient", e))
      .then(() => {
        toast.success("Data pasien berhasil dihapus", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error(error.code, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // Jadwal Praktek

  const [selectednurse, setselectednurse] = useState(datanurse[0]);
  const [iddocdoctor, setididocdoctor] = useState("");

  const handleClickStateEdit = (e) => {
    setisopen(true);
    setididocdoctor(e);
  };

  useEffect(() => {
    if (tabindex === 3) {
      setselectednurse(datanurse[0]);
    }
    console.log();
  }, [datanurse, tabindex]);

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="container mx-auto py-1 md:py-2 lg:py-4 xl:py-6 px-4 md:px-6 lg:px-8 xl:px-0">
        <Tabs selectedIndex={tabindex} onSelect={(index) => settabindex(index)}>
          <TabList>
            <Tab>Data Dokter</Tab>
            <Tab>Data Perawat</Tab>
            <Tab>Data Pasien</Tab>
            <Tab>Jadwal Prakter</Tab>
          </TabList>

          <TabPanel>
            {stateadddatadoctor ? (
              <form
                className="border-b border-gray-900/10 pb-8"
                onSubmit={(e) => {
                  handleFormDataDoctor(e);
                }}
              >
                <div className="space-y-12">
                  <div className="pb-12">
                    {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
                Dokter
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informasi tentang dokter
              </p> */}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name-doctor"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nama Dokter
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name-doctor"
                            id="name-doctor"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeNameDoctor}
                            value={namedoctor}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="num-sip"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          SIP
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="num-sip"
                            id="num-sip"
                            autoComplete="sip"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeSipDoctor}
                            value={sipdoctor}
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <p className="mt-1 text-sm leading-6 text-gray-600 font-bold">
                          Jadwal
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <Listbox
                          value={selecteddaypractice}
                          onChange={setselecteddaypractice}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                Hari Praktek
                              </Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6">
                                  <span className="flex items-center">
                                    <span className="block truncate">
                                      {selecteddaypractice.name}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {day.map((item) => (
                                      <Listbox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "bg-green-600 text-white"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={item}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "ml-3 block truncate"
                                                )}
                                              >
                                                {item.name}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-green-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>

                      <div className="sm:col-span-2">
                        <Listbox
                          value={selectedtimestart}
                          onChange={setselectedtimestart}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                Dari
                              </Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6">
                                  <span className="flex items-center">
                                    <span className="block truncate">
                                      {selectedtimestart.name}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {time.map((item) => (
                                      <Listbox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "bg-green-600 text-white"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={item}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "ml-3 block truncate"
                                                )}
                                              >
                                                {item.name}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-green-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>

                      <div className="sm:col-span-2">
                        <Listbox
                          value={selectedtimeend}
                          onChange={setselectedtimeend}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                Sampai
                              </Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6">
                                  <span className="flex items-center">
                                    <span className="block truncate">
                                      {selectedtimeend.name}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {time.map((item) => (
                                      <Listbox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "bg-green-600 text-white"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={item}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "ml-3 block truncate"
                                                )}
                                              >
                                                {item.name}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-green-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>

                      {/* <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="rounded-md text-sm px-3 py-2  font-semibold leading-6 text-gray-900 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleClickStateDoctor}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <></>
            )}
            <div className="mt-4 flex flex-row justify-end">
              <button
                className="flex items-center text-sm font-semibold leading-6 hover:bg-blue-600 py-1 px-3 rounded-md hover:text-gray-100 bg-blue-600 text-gray-100"
                type="button"
                onClick={handleClickStateDoctor}
              >
                <PlusIcon className="h-6" />
                Tambah Data
              </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama Dokter
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nomor SIP
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Hari Praktek
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Jam Praktek
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
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
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4">{item.number_sip}</td>
                        <td className="px-6 py-4">{item.practice[0].day}</td>
                        <td className="px-6 py-4">
                          {item.practice[0].start} - {item.practice[0].end}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="flex items-center text-sm font-semibold leading-6 hover:bg-red-600 py-1 px-3 rounded-md hover:text-gray-100 bg-red-600 text-gray-100"
                            type="button"
                            onClick={(e) => handleDeleteDoctor(item.id_doc)}
                          >
                            <TrashIcon className="h-6 mr-1" /> Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            {stateadddatanurse ? (
              <form
                className="border-b border-gray-900/10 pb-8"
                onSubmit={(e) => {
                  handleFormDataNurse(e);
                }}
              >
                <div className="space-y-12">
                  <div className="pb-12">
                    {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
                Perawat
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informasi tentang perawat
              </p> */}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name-nurse"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nama Perawat
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name-nurse"
                            id="name-nurse"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeNameNurse}
                            value={namenurse}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="num-sip-nurse"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          SIP
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="num-sip-nurse"
                            id="num-sip-nurse"
                            autoComplete="sip"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeSipNurse}
                            value={sipnurse}
                          />
                        </div>
                      </div>

                      {/* <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="rounded-md text-sm px-3 py-2  font-semibold leading-6 text-gray-900 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleClickStateNurse}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <></>
            )}
            <div className="mt-4 flex flex-row justify-end">
              <button
                className="flex items-center text-sm font-semibold leading-6 hover:bg-blue-600 py-1 px-3 rounded-md hover:text-gray-100 bg-blue-600 text-gray-100"
                type="button"
                onClick={handleClickStateNurse}
              >
                <PlusIcon className="h-6" />
                Tambah Data
              </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama Perawat
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nomor SIP
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
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
                  ) : datanurse.length === 0 ? (
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    datanurse.flatMap((item, index) => (
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4">{item.number_sip}</td>
                        <td className="px-6 py-4">
                          <button
                            className="flex items-center text-sm font-semibold leading-6 hover:bg-red-600 py-1 px-3 rounded-md hover:text-gray-100 bg-red-600 text-gray-100"
                            type="button"
                            onClick={(e) => handleDeleteNurse(item.id_doc)}
                          >
                            <TrashIcon className="h-6 mr-1" /> Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            {stateadddatapatient ? (
              <form
                className="border-b border-gray-900/10 pb-8"
                onSubmit={handleFormDataPatient}
              >
                <div className="space-y-12">
                  <div className="pb-12">
                    {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Perawat
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Informasi tentang perawat
                  </p> */}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name-patient"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nama Pasien
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name-patient"
                            id="name-patient"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeNamePatient}
                            value={namepatient}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="disease"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Penyakit
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="disease"
                            id="disease"
                            autoComplete="sip"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeDesease}
                            value={desease}
                          />
                        </div>
                      </div>

                      {/* <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="rounded-md text-sm px-3 py-2  font-semibold leading-6 text-gray-900 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleClickStatePatient}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <></>
            )}
            <div className="mt-4 flex flex-row justify-end">
              <button
                className="flex items-center text-sm font-semibold leading-6 hover:bg-blue-600 py-1 px-3 rounded-md hover:text-gray-100 bg-blue-600 text-gray-100"
                type="button"
                onClick={handleClickStatePatient}
              >
                <PlusIcon className="h-6" />
                Tambah Data
              </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama Pasien
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Penyakit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
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
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4">{item.desease}</td>
                        <td className="px-6 py-4">
                          <button
                            className="flex items-center text-sm font-semibold leading-6 hover:bg-red-600 py-1 px-3 rounded-md hover:text-gray-100 bg-red-600 text-gray-100"
                            type="button"
                            onClick={(e) => handleDeletePatient(item.id_doc)}
                          >
                            <TrashIcon className="h-6 mr-1" /> Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Hari Praktek
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama Dokter
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Perawat
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Jam Praktek
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
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
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {item.practice[0].day}
                          </th>
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4">
                            {item.id_nurse === undefined
                              ? "-"
                              : [
                                  datanurse.find(
                                    (o) => o.id_doc === item.id_nurse
                                  ),
                                ]
                                  .map((item,index) => item.name)
                                  .toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            {item.practice[0].start} - {item.practice[0].end}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="flex items-center text-sm font-semibold leading-6 hover:bg-yellow-600 py-1 px-3 rounded-md hover:text-gray-100 bg-yellow-600 text-gray-100"
                              type="button"
                              onClick={(e) => handleClickStateEdit(item.id_doc)}
                            >
                              <PencilSquareIcon className="h-6 mr-1" /> Edit
                            </button>
                          </td>
                        </tr>
                      </>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <Modal
        isOpen={modalisopen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Select Nurse"
      >
        <form
          className="w-[18rem] md:w-[36rem]"
          onSubmit={(e) => {
            handleUpdateDataDoctor(e, selectednurse.id_doc, iddocdoctor);
          }}
        >
          <Listbox value={selectednurse} onChange={setselectednurse}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                  Pilih Perawat
                </Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <span className="block truncate">
                        {selectednurse.name}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {datanurse.map((item) => (
                        <Listbox.Option
                          key={item.id_doc}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-green-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {item.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-green-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <div className="flex flex-row justify-center mt-4">
            <button
              className="flex items-center text-sm font-semibold leading-6 hover:bg-yellow-600 py-1 px-3 rounded-md hover:text-gray-100 bg-yellow-600 text-gray-100"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Dashboard;
