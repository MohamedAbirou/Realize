"use client";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { MusicSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const LyricsPage = () => {
  const { onOpen } = useProModal();
  const router = useRouter();
  const [musicLyrics, setMusicLyrics] = useState<string[]>();
  const [musicAudio, setMusicAudio] = useState<string>("");
  const [audioFeatures, setAudioFeatures] = useState<string[]>();
  const form = useForm<z.infer<typeof MusicSchema>>({
    resolver: zodResolver(MusicSchema),
    defaultValues: {
      artist: "",
      song: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof MusicSchema>) => {
    try {
      setMusicLyrics(undefined);
      setMusicAudio("");
      setAudioFeatures(undefined);

      const res = await axios.post("/api/lyrics", values);

      setMusicLyrics(res.data.lyrics);
      setMusicAudio(res.data.trackAudio);
      setAudioFeatures(res.data.audioFeatures);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        onOpen();
      } else if (!musicLyrics) {
        toast.error("No lyrics available for this song!");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Lyrics Generation"
        description="Turn your prompt into music lyrics."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="artist"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Artist Name</FormLabel>
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="e.g. Ed. Sheeran"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="song"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel>Song Title</FormLabel>
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="e.g. Perfect"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-12 w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <p className="inline">
                    Generating
                    <span className="inline animate-ping">.</span>
                    <span className="inline animate-ping delay-100">.</span>
                    <span className="inline animate-ping delay-200">.</span>
                  </p>
                ) : (
                  <span>Generate</span>
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 pb-7">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {!musicLyrics && !isLoading && (
            <Empty label="No music lyrics generated..." />
          )}

          {musicLyrics && (
            <>
              <div className="overflow-auto w-full my-2 bg-black/80 p-2 rounded-lg">
                <p className="text-lg text-white font-semibold overflow-hidden leading-7">
                  {musicLyrics.map((line: string, index: number) => (
                    <div key={index}>{line}</div>
                  ))}
                </p>
              </div>
              <div className="overflow-auto w-full my-2 bg-black/80 p-2 rounded-lg">
                <p className="text-lg text-white font-semibold overflow-x-scroll leading-7">
                  {audioFeatures && (
                    <pre>{JSON.stringify(audioFeatures, null, 2)}</pre>
                  )}
                </p>
              </div>
              <audio controls className="w-full mt-8">
                <source src={musicAudio} />
              </audio>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LyricsPage;
