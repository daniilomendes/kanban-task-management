import { useState } from "react";
import Center from "./components/Center";
import Header from "./components/Header";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <main className="">
      {/* Header Section */}
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />

      {/* Center Section */}
      <Center />
    </main>
  );
}

export default App;
