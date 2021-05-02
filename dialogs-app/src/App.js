import "./App.css";
import { ChatRoom } from "./components";
import ChatRoomFunctionality from "./components/ChatFunctionalityPoojaTemp/ChatRoom1";

function App() {
  return (
    <>
      <div className="App"></div>
      <ChatRoomFunctionality />
      <ChatRoom state={{ hostId: "15" }} />
    </>
  );
}

export default App;
