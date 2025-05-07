import { useRef } from "react";
import { ICustomVideo } from "@interfaces";

const CustomVideo = (props: ICustomVideo) => {
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;
  const { compData } = props;
  const { src, className, type, autoPlay = false, muted = false, loop = false, controls = true } = compData;

  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to check if the source is a YouTube link
  const isYouTube = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Function to convert YouTube URL to an embeddable URL
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    const youtubeRegex =
      /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match) {
      videoId = match[1];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=false&loop=${loop ? 1 : 0}&controls=true&mute=false`;
  };

  if (isYouTube(src)) {
    return (
      <iframe
        className={className}
        width="100%"
        height="auto"
        src={getYouTubeEmbedUrl(src)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      width="100%"
      height="auto"
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      controls={controls}
    >
      <source src={baseURL + src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default CustomVideo;
