"use client";
import Stepper from "./(stepper)/stepper";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-3 flex flex-col gap-5 p-5">
        <Stepper />
      </div>

      <div className="col-span-9 p-10">{children}</div>
    </div>
  );
};

export default RootLayout;
