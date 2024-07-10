
import { Inter } from "next/font/google";
import FormGen from "./reform";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
   <>
   <FormGen/>
   </>
  );
}
