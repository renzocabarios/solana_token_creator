"use client";
import { useCreateToken } from "@/lib/zustand/create-token.store";
import CreateMetadata from "./(form)/create-metadata";
import CreateToken from "./(form)/create-token";
import ReviewDetails from "./(components)/review-details";

export default function CreateFt() {
  const { page } = useCreateToken();
  switch (page) {
    case 1:
      return <CreateToken />;
    case 2:
      return <ReviewDetails />;
    default:
      return <CreateMetadata />;
  }
}
