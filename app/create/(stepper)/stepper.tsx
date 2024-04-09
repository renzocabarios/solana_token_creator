"use client";
import { useCreateToken } from "@/lib/zustand/create-token.store";
import Steps from "./steps";

export default function Stepper() {
  const steps: any[] = [
    {
      id: 0,
      title: "Upload Metadata",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis maxime alias error",
    },
    {
      id: 1,

      title: "Mint Details",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis maxime alias error",
    },
    {
      id: 2,

      title: "Review",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis maxime alias error",
    },
  ];

  const { page } = useCreateToken();

  return (
    <>
      {steps.map((e: any) => {
        return (
          <Steps
            key={e.id}
            title={e.title}
            description={e.description}
            selected={page === e.id}
          />
        );
      })}
    </>
  );
}
