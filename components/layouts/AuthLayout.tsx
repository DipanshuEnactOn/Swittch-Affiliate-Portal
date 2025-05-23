import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex flex-col justify-center w-full h-screen dark:bg-gray-900 sm:p-0 lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
      <div className="relative items-center hidden w-full h-full bg-brand-950 dark:bg-white/5 lg:grid lg:w-1/2">
        <div className="absolute right-0 top-0 w-full max-w-[250px] xl:max-w-[450px]">
          <Image
            src="/images/grid-01.svg"
            alt="Grid"
            height={100}
            width={100}
            className="w-full h-auto"
          />
        </div>
        <div className="w-full flex items-center justify-center h-auto">
          <Image
            src="/images/swittch.png"
            alt="Logo"
            height={250}
            width={250}
            className=""
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
          <Image
            src="/images/grid-01.svg"
            alt="Grid"
            height={100}
            width={100}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
