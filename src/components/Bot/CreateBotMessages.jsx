
const Chatmessage=(Message,Type)=>{
    const UserMessage = document.querySelector(".ChatBox");
    const UserInputMessage = document.createElement("li")
    UserInputMessage.classList.add("chat",Type);
    console.log("test",UserInputMessage)
    UserInputMessage.innerHTML="<p>/p>"
    UserInputMessage.querySelector("p").textContent = Message;
    UserMessage.appendChild(UserInputMessage)
}
export default Chatmessage