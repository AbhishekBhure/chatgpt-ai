import Image from "next/image";
import favicon from "../../public/favicon.ico";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [count, setCount] = useState(0);
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState([]);

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
    <div className={styles.body}>
      <main className={styles.main}>
        <Image src={favicon} alt="favicon" className={styles.icon} />
        <h3 className="text-[green]">Name my pet</h3>
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
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
