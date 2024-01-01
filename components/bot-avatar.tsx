import { Avatar, AvatarImage } from "./ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar>
      <AvatarImage className="p-2.5 bg-black" src="/favicon.ico" />
    </Avatar>
  );
};
