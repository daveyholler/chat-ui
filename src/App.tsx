import React from "react";
import "./App.scss";

import { SourceItem } from "./components/source_item";
import { ChatMessageType } from "./components/chat_message";
import { ChatMessageList } from "./components/chat_message_list";
import { Summary } from "./components/summary";

function App() {
  const tempMessages: ChatMessageType[] = [
    {
      id: 1,
      content: "Look, this is a sample message from a human",
      isHuman: true,
    },
    {
      id: 2,
      content:
        "Beep boop, I'm a robot. Its a long message so we can see how well this bad boy wraps.",
    },
    {
      id: 3,
      content:
        "Great! Can you show more sources about the other thing? I just really wonder about all the nonsense that's floating around in my mind.",
      isHuman: true,
    },
    {
      id: 4,
      content: "Sure. As a robot I can give you all sorts of things!",
      sources: [
        {
          name: "Another useful document.pdf",
          icon: "pdf",
        },
        {
          name: "Budget allocations.xslx",
          icon: "excel",
        },
      ],
    },
  ];
  return (
    <div className="App">
      <h2>Component library</h2>
      <Summary />
      <SourceItem name="Pet policy - 2023 Update" icon="sharepoint" />
      <ChatMessageList messages={tempMessages} />
    </div>
  );
}

export default App;
