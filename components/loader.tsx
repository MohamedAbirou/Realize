import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-7 h-7 relative animate-bounce">
        <Image src="/favicon.ico" alt="logo" fill />
      </div>
      <p className="text-sm text-muted-foreground inline">
        Realize is thinking
        <span className="inline animate-ping">.</span>
        <span className="inline animate-ping delay-100">.</span>
        <span className="inline animate-ping delay-200">.</span>
      </p>
    </div>
  );
};
