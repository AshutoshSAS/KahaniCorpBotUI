import axios from 'axios';
 const BotResponseApi=async(Message)=>{

    const PayLoad={
      "user_message" : Message,
      "request_id" : "ajdxid",
      "session_id" : "sidnsos"
  }
  console.log("Message",Message)
    
    let ApiResponse = await axios.post('http://15.206.189.114:8000/chatbot/ask_chatbot',PayLoad,{  headers: { 
        'Content-Type': 'application/json'
      }}
      )
      return ApiResponse.data.chatbot_response
     
}
export default BotResponseApi