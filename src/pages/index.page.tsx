import Image from "next/image";
import { Inter } from "next/font/google";
import ForYouPage from "./ForYouPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <ForYouPage />;
}
