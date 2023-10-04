import Image from "next/image";
import favicon from "../../public/favicon.ico";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [animalInput, setAnimalInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //making api call
      const res = await fetch("api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await res.json();

      //handling error
      if (res.status !== 200) {
        throw (
          data.error || new Error(`Request failed with status ${res.status}`)
        );
      }
      setCount(count + 1);
      setAnimalInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleChange = (e) => {
    setAnimalInput(e.target.value);
    console.log(animalInput);
  };

  return (
    <div>
      <main
        className={`flex min-h-screen flex-col items-center justify-between dark:bg-black p-24`}
      >
        <Image src={favicon} alt="favicon" className="w-30 h-30" />
        <h3 className="text-[green]">Name my pet</h3>
        <p>You&apos;ve used this app {count} times</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="animal"
            value={animalInput}
            placeholder="Enter an animal"
            onChange={handleChange}
          />
          <input type="submit" value="Generate names" />
        </form>
      </main>
    </div>
  );
}
