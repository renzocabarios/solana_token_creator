import Link from "next/link";

export function Sidenav() {
  return (
    <div className="min-h-[100vh] w-[15vw] flex flex-col p-3 gap-3 bg-slate-900">
      <Link href={"/"}>Mint Tokens</Link>
      <Link href={"/nft"}>Mint NFT</Link>
      <Link href={"/find-by-mint"}>Find By Mint</Link>
    </div>
  );
}
