import React from "react";
import SectionDivider from "../common/SectionDivider";
import { Gamepad2, Globe } from "lucide-react";

const Service = () => {
    return (
        <>
        <div className="relative -mt-16">
            <SectionDivider direction="up" />
        </div>

        <section className="oy-16 bg-white text-[#043b4a]">
            <h2 className="text-2xl md:text-3xl font-semibold  text-center mb-10 tracking-wide">
                OUR SERVICE
            </h2>

            {/* Container Cart */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 md:px-0">
                {/* Cart */}
                <div className="border border-[#035f78] rounded-lg p-6 w-full md:w-96 text-center shadow-sm hover:shadow-lg transition">
                    <div className="flex justify-center mb-4">
                        <div className="bg-[#d6f1f7] p-3 rounded-full">
                            <Gamepad2 size={36} className="text-[#035f78]" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-3">GAME DEVELOPER</h3>
                    <p className="text-sm mb-6 leading-relaxed">
                        Bangun dunia permainan impianmu bersama kami! 
                        Kami siap membantu menciptakan game yang seru, interaktif, dan penuh tantangan
                        dengan desaign serta gameplay yang memikat.
                        Bersama kami, ide kreatifmu akan berubah menjadi pengalaman bermain yang tak terlupakan.
                        
                    </p>
                    <button className="bg-[#035f78] text-white text-sm font-semibold px-5 py-2 rounded hover:bg-[#024e63] transition">
                        HUBUNGI ADMIN
                    </button>
                </div>

                {/* Cart */}
                <div className="border border-[#035f78] rounded-lg p-6 w-full md:w-96 text-center shadow-sm hover:shadow-lg transition">
                    <div className="flex justify-center mb-4">
                        <div className="bg-[#d6f1f7] p-3 rounded-full">
                            <Globe size={36} className="text-[#035f78]" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-3">WEBSITE DEVELOPER</h3>
                    <p className="text-sm mb-6 leading-relaxed">
                        Ingin punya website yang keren untuk menjalankan bisnismu?
                        Kami bantu wujudkan tampilan profesional dan responsif yang siap menarik perhatian pelangganmu.
                        Mulai dari desain modern, fitur lengkap, hingga peforma cepat - meuanya bisa kamu dapatkan di sini
                    </p>
                    <button className="bg-[#035f78] text-white text-sm font-semibold px-5 py-2 rounded hover:bg-[#024e63] transition">
                        HUBUNGI ADMIN
                    </button>
                </div>
            </div>
        </section>
        </>
    )
}

export default Service;