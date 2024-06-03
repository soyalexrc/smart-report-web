import Image from "next/image";
import ImageCapturer from "@/components/ImageCapturer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <ImageCapturer />
   </main>
  );
}
