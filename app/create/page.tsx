"use client";
import { useCreateToken } from "@/lib/zustand/create-token.store";
import CreateMetadata from "./(form)/create-metadata";
import CreateToken from "./(form)/create-token";

export default function CreateFt() {
  const { page } = useCreateToken();

  switch (page) {
    case 1:
      return <CreateToken />;
    default:
      return <CreateMetadata />;
  }
}
