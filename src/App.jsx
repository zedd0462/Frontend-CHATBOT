import { useState } from "react";

import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);


  const generateBotResponse = async (question) => {
    try {
      /*const response = await fetch(
        `https://mql-chat-hrb5g2ddb9ajg3ek.francecentral-01.azurewebsites.net/chat/ask?question=${encodeURIComponent(question)}`
      );*/
      //we have to send the question as a POST request like this
      // {"message":"question"}
      const response = await fetch(
        `https://mqlbot.azurewebsites.net/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: question }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.text(); 
      return data;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Sorry, something went wrong. Please try again.";
    }
  };
  
  return (
    <div className={`container ${showChatbot ? "show-chatbot":""}`}>

      <button onClick={()=>setShowChatbot(prev=>!prev)} id="chatbot-toggler">

        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>


      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">chatbot MQL</h2>
          </div>
          <button onClick={()=>setShowChatbot(prev=>!prev)} className="material-symbols-rounded">
            Keyboard_arrow_down
          </button>
        </div>

        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey  <br /> Que souhaitez-vous savoir sur les étudiants du Master Qualité Logiciel  ?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm  chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  );
};

export default App;
