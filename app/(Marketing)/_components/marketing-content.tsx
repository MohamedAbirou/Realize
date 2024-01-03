"use client";

import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const testimonials = [
  {
    name: "Liam Pyro",
    avatar: "L",
    title: "Web Developer",
    description: "This is the best AI application I've ever used!",
  },
  {
    name: "Ethan Johnson",
    avatar: "E",
    title: "Video Editor",
    description: "Creating videos is a breeze with this app!",
  },
  {
    name: "Aiden Taylor",
    avatar: "A",
    title: "Software Engineer",
    description: "The code generation feature is a game-changer!",
  },
  {
    name: "Sofia Anderson",
    avatar: "S",
    title: "Graphic Designer",
    description: "Image generation has never been this easy!",
  },
  {
    name: "Olivia Martinez",
    avatar: "O",
    title: "Music Producer",
    description: "Music generation is incredibly intuitive and fun!",
  },
  {
    name: "Mason Rodriguez",
    avatar: "M",
    title: "AI Enthusiast",
    description: "This app is the future of AI applications!",
  },
];

export const MarketingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.description}
            className="bg-[#192339] text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarFallback className="text-black">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
