import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Music prompt is required",
  }),
});

export const MusicSchema = z.object({
  artist: z.string().min(1, {
    message: "Song's title prompt is required",
  }),
  song: z.string().min(1, {
    message: "Artist's name prompt is required",
  }),
});
