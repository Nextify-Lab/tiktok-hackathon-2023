import { Inter } from "next/font/google";

import React, { useEffect, useState, useRef } from "react";
import VideoCard from "../components/VideoCard";
import { videoUrls } from "@/../public/videoUrls";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function ForYouPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    // Check if the Geolocation API is supported
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
        },
        function (error) {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target as HTMLVideoElement;
          videoElement.play();
        } else {
          const videoElement = entry.target as HTMLVideoElement;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef!);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index: number) => (ref: HTMLVideoElement | null) => {
    videoRefs.current[index] = ref;
  };
  return (
    <Layout>
      {/* Here we map over the videos array and create VideoCard components */}
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          username={video.username}
          description={video.description}
          song={video.song}
          likes={video.likes}
          saves={video.saves}
          comments={video.comments}
          shares={video.shares}
          url={video.url}
          profilePic={video.profilePic}
          setVideoRef={handleVideoRef(index)}
          autoplay={index === 0}
          productId={video.productId}
          geolocation={userLocation}
        />
      ))}
    </Layout>
  );
}
