import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BotResponseApi from "../BotApi/BotApi";
import Chatmessage from "./CreateBotMessages";
import "./chatBot.css";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import Avatar from "@mui/material/Avatar";
import { BeatLoader, ScaleLoader } from "react-spinners";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
export default function ChatBot() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('Request_Id');
  console.log("requestid",myParam)
  const [closeButton, setclosebutton] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [UserInputTextValue, setUserInputTextValue] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  useEffect(() => {
    if (listening && transcript) {
      setUserInputTextValue(transcript);
    }
  }, [transcript, listening]);
  const HandleUserInputText = (e) => {
    setUserInputTextValue(e.target.value);
  };

  const handleSubmit = async () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    var input = UserInputTextValue;
    setUserInputTextValue("");
    console.log("value", input);
    if (input) {
      Chatmessage(input, "OutGoingMessage");
      var ScrollChatEnd = document.querySelector(".ChatBox");
      ScrollChatEnd.scrollTop = ScrollChatEnd.scrollHeight;
      setLoader(true);
      let IncomingResponse = await BotResponseApi(input,myParam);

      Chatmessage(IncomingResponse, "IncomingMessage");
      ScrollChatEnd.scrollTop = ScrollChatEnd.scrollHeight;
      setLoader(false);
    }
  };
  const handleToggle = () => {
    const chatbox = document.querySelector(".ChatBotContaner");

    if (closeButton) {
      chatbox.classList.add("InChatActive");
      setclosebutton(!closeButton);
    } else {
      setclosebutton(!closeButton);
      chatbox.classList.remove("InChatActive");
    }
  };

  return (
    <>
      <div className="ChatBotContaner InChatActive">
        <div className="chatBot">
          <div className="ChatBotName">
            <h3>
           
              <center>chatBot</center>
            </h3>
            <div className="ChatbotHeader">
              <center>Hi wlecome to your virtual Assistant</center>
            </div>
          </div>

          <div className="ChatBotBody">
            <ul className="ChatBox">
              <li className="chat IncomingMessage">
        
                <p >Hi How may I help you</p> 
              </li>
              
            </ul>
          </div>
        </div>
        {Loader ? (
          <div className="ChatBotLoader">
            <center>
              <BeatLoader></BeatLoader>
            </center>
          </div>
        ) : (
          ""
        )}

        <div className="ChatBotInput">
          <div className="Chatbotfooter">
            <center>Powered by KahaniCorp</center>
          </div>
          <div className="ChatboxInp">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="Message"
              placeholder="Hi, please type your messsage here"
              required
              value={UserInputTextValue}
              onChange={HandleUserInputText}
            ></textarea>
            <span className="Speech">
              {!listening ? (
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={startListening}
                >
                  <MicIcon fontSize="small" />
                </IconButton>
              ) : (
                <ScaleLoader />
              )}
            </span>
            <span className="SendButton">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={handleSubmit}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </span>
          </div>
        </div>
      </div>

      <button className="chatbot-toggler" onClick={handleToggle}>
        <Avatar>CB</Avatar>
      </button>
    </>
  );
}
