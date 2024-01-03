import Image from "next/image";

interface ErrorProps {
  label: string;
}

export const Error = ({ label }: ErrorProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-60 w-60">
        <Image src="/error.png" alt="error" fill />
      </div>
      <p className="text-muted-foreground text-lg text-center pt-7">{label}</p>
    </div>
  );
};
