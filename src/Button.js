import { useState } from "react";

const Flashcard = () => {
  // State for managing multiple flashcards
  const [flashcards, setFlashcards] = useState([
    { id: 1, frontText: "Front side", backText: "Back side" },
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [tempText, setTempText] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);

  // Get the current flashcard
  const currentCard = flashcards[currentCardIndex];

  const handleRightClick = (e) => {
    e.preventDefault();
    setTempText(isFront ? currentCard.frontText : currentCard.backText);
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const updatedFlashcards = [...flashcards];
      if (isFront) {
        updatedFlashcards[currentCardIndex].frontText = tempText;
      } else {
        updatedFlashcards[currentCardIndex].backText = tempText;
      }
      setFlashcards(updatedFlashcards);
      setIsEditing(false);
    }
  };

  const handleFlip = () => {
    if (!isEditing) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFront(!isFront);
        setIsFlipping(false);
      }, 300); // Match the animation duration
    }
  };

  const handleAddCard = () => {
    const newCard = {
      id: flashcards.length + 1,
      frontText: "New Front",
      backText: "New Back",
    };
    setFlashcards([...flashcards, newCard]);
    setCurrentCardIndex(flashcards.length); 
  };

  const handleDeleteCard = () => {
    if (flashcards.length === 1) return; 
    const updatedFlashcards = flashcards.filter(
      (_, index) => index !== currentCardIndex
    );
    setFlashcards(updatedFlashcards);
    setCurrentCardIndex(Math.max(0, currentCardIndex - 1)); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      
      <div
        className={`relative bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-6 rounded-xl shadow-2xl cursor-pointer select-none transform transition-all duration-300 ${
          isFlipping ? "rotate-y-180" : ""
        } hover:scale-105`}
        onClick={handleFlip}
        onContextMenu={handleRightClick}
        style={{ width: "300px", height: "200px" }}
      >
        {isEditing ? (
          <input
            className="outline-none w-full bg-transparent text-white placeholder-gray-200 border-b-2 border-white text-center"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h3 className="text-xl font-semibold text-center">
            {isFront ? currentCard.frontText : currentCard.backText}
          </h3>
        )}
        {/* Card Indicator */}
        <div className="absolute top-2 right-2 bg-white text-blue-500 rounded-full px-2 py-1 text-sm">
          {currentCardIndex + 1}/{flashcards.length}
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() =>
            setCurrentCardIndex(Math.max(0, currentCardIndex - 1))
          }
          disabled={currentCardIndex === 0}
          className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg hover:bg-blue-100 disabled:opacity-50 transition"
        >
          ← Previous
        </button>
        <button
          onClick={() =>
            setCurrentCardIndex(
              Math.min(flashcards.length - 1, currentCardIndex + 1)
            )
          }
          disabled={currentCardIndex === flashcards.length - 1}
          className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg hover:bg-blue-100 disabled:opacity-50 transition"
        >
          Next →
        </button>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleAddCard}
          className="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105"
        >
          + Add Card
        </button>
        <button
          onClick={handleDeleteCard}
          disabled={flashcards.length === 1}
          className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 disabled:opacity-50 transition transform hover:scale-105"
        >
          - Delete Card
        </button>
      </div>
    </div>
  );
};

export default Flashcard;