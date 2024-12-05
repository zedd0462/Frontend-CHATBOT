import ChatbotIcon from "./ChatBotIcon";
import { marked } from "marked";

const ChatMessage = ({ chat }) => {
  // Convertir le texte en HTML avec `marked`
  const formattedText = marked(chat.text);

  return (
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <ChatbotIcon />}
      <p
        className="message-text"
        dangerouslySetInnerHTML={{ __html: formattedText }} // Injection sécurisée d'HTML
      ></p>
    </div>
  );
};

export default ChatMessage;
