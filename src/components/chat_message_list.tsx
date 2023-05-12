import { ChatMessageType, ChatMessage } from "./chat_message";

type ChatMessageListType = {
  messages: ChatMessageType[];
};
export const ChatMessageList: React.FC<ChatMessageListType> = ({
  messages,
}) => {
  const styles = {
    messageList: {
      width: 600,
    },
  };

  return (
    <div style={styles.messageList}>
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          id={msg.id}
          content={msg.content}
          isHuman={msg.isHuman}
          sources={msg.sources || undefined}
        />
      ))}
    </div>
  );
};
