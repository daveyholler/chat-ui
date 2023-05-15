import { ChatMessageType, ChatMessage } from "./chat_message";

type ChatMessageListType = {
  messages: ChatMessageType[];
  incomingMessage: string | null;
};
export const ChatMessageList: React.FC<ChatMessageListType> = ({
  messages,
  incomingMessage
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
      {incomingMessage && (
        <ChatMessage
          key={messages.length + 1}
          id={messages.length + 1}
          content={incomingMessage}
          isHuman={false}
        />
      )}
    </div>
  );
};
