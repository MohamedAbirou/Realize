import stringSimilarity from "string-similarity";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { artist, song } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!artist || !song) {
      return new NextResponse("Both artist and song title are required", {
        status: 400,
      });
    }

    const freetrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freetrial && !isPro) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID_KEY;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET_KEY;

    const authResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = authResponse.data.access_token;

    // Fetch track information from the SPOTIFY search api route
    const searchResponse = await axios.get(
      "https://spotify23.p.rapidapi.com/search/",
      {
        headers: {
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        },
        params: {
          q: `${song} by ${artist}`,
          type: "tracks",
          limit: "1", // Limit to 1 result since I'm looking for a specific track
        },
      }
    );

    const trackMatches = searchResponse.data.tracks.items;

    if (!trackMatches || trackMatches.length === 0) {
      return new NextResponse("Track not found!", { status: 404 });
    }

    // Find the closest matching artist using string similarity
    const artistNames = trackMatches.map(
      (match: string | any) => match.data.artists.items[0].profile.name
    );

    const { bestMatch } = stringSimilarity.findBestMatch(artist, artistNames);

    const { target } = bestMatch;
    const bestMatchIndex = trackMatches.findIndex(
      (match: string | any) =>
        match.data.artists.items[0].profile.name === target
    );

    if (bestMatchIndex === -1) {
      return new NextResponse("Artist not found!", { status: 404 });
    }

    const firstMatchId = trackMatches[bestMatchIndex].data.id;

    // fetch track emotions from the official SPOTIFY api

    const audioFeaturesResponse = await axios.get(
      `https://api.spotify.com/v1/audio-features/${firstMatchId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const audioFeatures = audioFeaturesResponse.data;

    if (!audioFeatures || audioFeatures.length === 0) {
      return new NextResponse("Failed to fetch audio features for the track!", {
        status: 500,
      });
    }

    // Fetch the track details
    const trackDetailsResponse = await axios.get(
      "https://spotify23.p.rapidapi.com/tracks/",
      {
        headers: {
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        },
        params: {
          ids: firstMatchId,
        },
      }
    );

    const trackDetails = trackDetailsResponse.data.tracks[0];

    const trackAudio = trackDetails.preview_url;

    if (!trackDetails) {
      return new NextResponse("Failed to fetch track details by ID!", {
        status: 500,
      });
    }

    // Fetch the track lyrics
    const trackLyricsResponse = await axios.get(
      "https://spotify23.p.rapidapi.com/track_lyrics/",
      {
        headers: {
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        },
        params: {
          id: trackDetails.id,
        },
      }
    );

    const lyrics = trackLyricsResponse.data.lyrics.lines.map(
      (line: string | any) => line.words
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json({ lyrics, trackAudio, audioFeatures });
  } catch (error) {
    console.log("[MUSIC_LYRICS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
