import React from "react";
import Navbar from "../components/navbar";
import ImageHome from "../assets/image/home-1.jpg";
import { MapPinIcon } from "@heroicons/react/20/solid";
import ToothFilling from "../assets/image/tambal gigi.jpg";
import Toothpick from "../assets/image/cabut gigi.jpg";
import CleaningTartar from "../assets/image/pembersihan karang.jpg";
import DentalEducation from "../assets/image/belajar gigi.jpg";
import OnlineConsul from "../assets/image/konsultasi online.jpg";

function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col container mx-auto py-4 md:py-6 lg:py-8 xl:py-14 px-4 md:px-6 lg:px-8 xl:px-0">
        <div className="flex flex-col md:flex-row">
          <div className="basis-1/2">
            <img src={ImageHome} alt="" className="h-full"></img>
          </div>
          <div className="basis-1/2 bg-green-100 p-4 md:p-6 lg:p-8 rounded-md">
            <p className="text-gray-900 md:text-xl lg:text-2xl font-bold">
              Pelayanan Gigi
            </p>
            <p className="text-gray-900 text-sm xl:text-base mt-2">
              Pelayanan Kesehatan Gigi (Pelayanan Gigi) merupakan salah satu
              dari jenis layanan di Puskesmas Kecamatan Kembangan yang
              memberikan pelayanan kesehatan gigi dan mulut berupa pemeriksaan
              kesehatan gigi dan mulut, pengobatan dan pemberian tindakan medis
              dasar kesehatan gigi dan mulut seperti :
            </p>
            <ol className="text-sm lg:text-base">
              <li>1. Penambalan gigi</li>
              <li>2. Pencabutan gigi</li>
              <li>3. Pembersihan karang gigi</li>
              <li>
                4. Memberikan penyuluhan dan edukasi mengenai pentingnya menjaga
                kesehatan gigi dan mulut sebagai bagian dari menjaga kesehatan
                pribadi
              </li>
              <li>
                5. Meningkatkan pengetahuan dan kesadaran masyarakat dalam
                bidang kesehatan gigi dan mulut
              </li>
              <li>
                6. Serta pelayanan JAKGO (Jaringan Konsultasi Kesehatan Gigi
                Online)
              </li>
            </ol>
            <p className="text-gray-900 lg:text-sm xl:text-base flex flex-row mt-4 lg:mt-8">
              <MapPinIcon className="h-8 w-8 mr-2" /> Lokasi Klinik: Jl. Pertiwi
              Raya No.31-43, Kedaung, Kec. Sawangan, Kota Depok, Jawa Barat
              16516
            </p>
          </div>
        </div>

        <div className="flex flex-col text-center mt-10">
          <p className="md:text-xl lg:text-2xl font-bold">Pelayanan Kami</p>
          <div className="flex flex-row justify-center flex-wrap mt-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="basis-2/3">
                <img
                  src={ToothFilling}
                  alt=""
                  className="h-36 w-36 md:h-40 md:w-40 lg:h-60 lg:w-60"
                ></img>
              </div>
              <div className="basis-1/3 mt-4 text-sm lg:text-base">
                Tambal Gigi
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="basis-2/3">
                <img
                  src={Toothpick}
                  alt=""
                  className="h-36 w-36 md:h-40 md:w-40 lg:h-60 lg:w-60"
                ></img>
              </div>
              <div className="basis-1/3 mt-4 text-sm lg:text-base">
                Pencabutan Gigi
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="basis-2/3">
                <img
                  src={CleaningTartar}
                  alt=""
                  className="h-36 w-36 md:h-40 md:w-40 lg:h-60 lg:w-60"
                ></img>
              </div>
              <div className="basis-1/3 mt-4 text-sm lg:text-base">
                Pembersihan Karang Gigi
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="basis-2/3">
                <img
                  src={DentalEducation}
                  alt=""
                  className="h-36 w-36 md:h-40 md:w-40 lg:h-60 lg:w-60"
                ></img>
              </div>
              <div className="basis-1/3 mt-4 text-sm lg:text-base">
                Edukasi Tentang Gigi
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="basis-2/3">
                <img
                  src={OnlineConsul}
                  alt=""
                  className="h-36 w-36 md:h-40 md:w-40 lg:h-60 lg:w-60"
                ></img>
              </div>
              <div className="basis-1/3 mt-4 text-sm lg:text-base">
                Konsultasi Online
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
