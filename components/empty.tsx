import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-60 w-60">
        <Image src="/empty.png" alt="empty" fill />
      </div>
      <p className="text-muted-foreground text-lg text-center pt-7">{label}</p>
    </div>
  );
};
