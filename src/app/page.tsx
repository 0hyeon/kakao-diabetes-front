"use client";
import Image from "next/image";
import Input from "./components/input";

export default function Home() {
  return (
    // 📍
    <div className="">
      <div className="">
        <div className="absolute top-0 w-[80%] flex items-center">
          <Image
            alt="star"
            src={"/images/green_star.png"}
            width={80}
            height={80}
          />
          <div className="text-white text-sm">
            1단계 <span className="text-gray-400">(총 4단계)</span>
          </div>
        </div>
        {/* 휴대전화멘트 */}
        <div className="leading-16 flex gap-2 flex-col absolute top-[25%] w-[85%] left-[50%] -translate-x-1/2">
          <div className="text-white text-3xl">
            <span style={{ color: "#9ed449" }}>휴대전화 번호</span>를
            <div>입력해주세요.</div>
          </div>
          <Input
            name="name"
            required
            placeholder="010-0000-0000"
            // {...register("color")}
            className="bg-white border-gray-300 h-10 focus:ring-2 focus:ring-indigo-500 w-full placeholder:text-xl p-2"
            // errors={state?.fieldErrors.color}
          />
          <div className="text-white text-sm">
            📍지원 소식을 카톡 메시지로 알려드려요.
          </div>
        </div>
        {/* 다음 */}
        <div
          onClick={() => alert("1단계만 구현된상태")}
          className="cursor-pointer absolute bottom-0 flex items-center justify-center bg-[#9ed449] w-full h-[10%] text-xl"
        >
          다음
        </div>
      </div>
    </div>
  );
}
