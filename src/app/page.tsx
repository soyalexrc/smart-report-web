import Image from "next/image";
import ImageCapturer from "@/components/ImageCapturer";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        home page
        <Link href='/administracion'>
            <Button>Administracion</Button>
        </Link>
   </main>
  );
}
