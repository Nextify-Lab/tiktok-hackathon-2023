interface SampleType {
  sample: string;
}

interface Video {
  url: string;
  profilePic: string;
  username: string;
  description: string;
  song: string;
  likes: number | string; // As you have used a string for likes in one video
  comments: number;
  saves: number;
  shares: number;
}
