import Image from "next/image";
import favicon from "../../public/favicon.ico";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <main
        className={`flex min-h-screen flex-col items-center justify-between dark:bg-black p-24`}
      >
        <Image src={favicon} alt="favicon" className="w-30 h-30" />
        <h3 className="text-[green]">Name my pet</h3>
        <form>
          <input type="text" name="animal" placeholder="Enter an animal" />
          <input type="submit" />
        </form>
      </main>
    </div>
  );
}
