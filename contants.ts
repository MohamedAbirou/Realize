import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings,
} from "lucide-react";

export const MAX_FREE_COUNT = 5;

export const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Music Lyrics Generation",
    icon: Music,
    href: "/lyrics",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
