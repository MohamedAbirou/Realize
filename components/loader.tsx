import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-7 h-7 relative animate-bounce">
        <Image src="/favicon.ico" alt="logo" fill />
      </div>
      <p className="text-sm text-muted-foreground">Realise is thinking...</p>
    </div>
  );
};
