import { useEffect, useState } from "react";
import "@/App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("/api");
      const { message } = await data.json();
      setMessage(message);
    }
    fetchData();
  }, []);

  return message;
}

export default App;
