import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage) return;
    inputRef.current.value = "";

    // Add user's message to chat history
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Display "Thinking..." placeholder
    setChatHistory((history) => [
      ...history,
      { role: "model", text: "Thinking..." },
    ]);

    try {
      // Fetch bot response and update chat history
      const botResponse = await generateBotResponse(userMessage);
    
      // Replace the "Thinking..." message with actual response
      setChatHistory((history) =>
        history.map((msg) =>
          msg.text === "Thinking..." ? { ...msg, text: botResponse } : msg
        )
      );
    } catch (error) {
      console.error("Error generating response:", error);
      setChatHistory((history) =>
        history.map((msg) =>
          msg.text === "Thinking..."
            ? { ...msg, text: "Sorry, something went wrong." }
            : msg
        )
      );
    }
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
