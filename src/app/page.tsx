"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex gap-[100px]">
      <div className="flex-1 flex flex-col gap-[50px]">
        <h1 className="text-[96px]">Family Management Website</h1>
        <p className="text-[20px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
          blanditiis adipisci minima reiciendis a autem assumenda dolore.
        </p>
        <div className="flex gap-[20px]">
          <button className="p-5 min-w-[120px] cursor-pointer border rounded-[5px]">
            Learn More
          </button>
          <button
            onClick={() => router.push("/login")}
            className="p-5 min-w-[120px] cursor-pointer border-none rounded-[5px] bg-blue-600 text-white"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="flex-1 relative">
        <Image src="/hero.gif" alt="" fill />
      </div>
    </div>
  );
}
