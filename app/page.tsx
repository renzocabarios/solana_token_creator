import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[95vh] flex justify-center items-center flex-col gap-2">
      <p className="text-white font-semibold text-2xl">
        This site is under Construction
      </p>

      <Link href={"/create"}>
        <p className="text-slate-500 font-semibold text-2xl underline">
          Go to Create Token
        </p>
      </Link>
    </div>
  );
}
