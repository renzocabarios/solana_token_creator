import React from "react";
import CreateForm from "./(components)/create-form";

export default function Home() {
  return (
    <div className="min-h-[95vh] flex  flex-col gap-2">
      <CreateForm />
    </div>
  );
}
