import Link from "next/link";
import { Navbar } from "@/components/navbar";
import CreateNftForm from "./(form)/page";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex">
        <div className="h-[90vh] w-[15vw] flex flex-col p-3 gap-3 bg-slate-900">
          <Link href={"/"}>Mint Tokens</Link>
          <Link href={"/nft"}>Mint NFT</Link>
        </div>
        <div className="flex justify-center items-center h-[90vh] w-[85vw] gap-10 ">
          <CreateNftForm />
        </div>
      </div>
    </main>
  );
}
