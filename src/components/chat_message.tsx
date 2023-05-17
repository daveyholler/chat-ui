// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Avatar from "./images/robot-avatar.png";
import { SourceItem, SourceType } from "./source_item";

export type ChatMessageType = {
  id: number | string;
  content: string;
  isHuman?: boolean;
  sources?: SourceType[];
};
export const ChatMessage: React.FC<ChatMessageType> = ({
  id,
  content,
  isHuman,
  sources,
}) => {
  const styles = {
    wrapper: {
      display: "flex",
      width: "100%",
      justifyContent: isHuman ? "flex-end" : "flex-start",
      marginTop: "1.5rem",
      gap: "12px",
    },
    message: {
      padding: "12px",
      width: "400px",
      background: isHuman
        ? "linear-gradient(180deg, #00BFB3 0%, #019B8F 100%)"
        : "linear-gradient(180deg, #F7F9FC 0%, #F1F4FA 100%)",
      boxShadow: isHuman
        ? "0px 0.7px 3.4px rgba(0, 0, 0, 0.15), 0px 1.9px 8px rgba(0, 0, 0, 0.03), 0px 4.5px 16px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 0.8)"
        : "0px 0.7px 3.4px rgba(0, 0, 0, 0.15), 0px 1.9px 8px rgba(0, 0, 0, 0.03), 0px 4.5px 16px rgba(0, 0, 0, 0.1), inset 0px 1px 1px #FFFFFF",
      borderRadius: "12px",
    },
    messageContent: {
      color: isHuman ? "#000000" : "#1C1E23",
      textShadow: isHuman ? "0px 1px 0px #38C2B4" : "0px 1px 0px #FFFFFF",
    },
    sourceList: {
      display: "inline-flex",
      paddingLeft: "44px",
      flexDirection: "column",
      gap: "8px",
      paddingTop: "1rem",
    },
  };
  return (
    <>
      <div style={styles.wrapper}>
        {!isHuman && (
          <img src={Avatar} alt="" className="w-10 h-10 ring-2 ring-white" />
        )}
        <div style={styles.message}>
          <span
            style={styles.messageContent}
            className="whitespace-pre-wrap leading-normal"
          >
            {content}
          </span>
        </div>
      </div>
      <div style={styles.sourceList as React.CSSProperties}>
        {sources &&
          sources.length >= 1 &&
          sources.map((src, index) => (
            <SourceItem key={index} name={src.name} icon={src.icon} href={src.href} />
          ))}
      </div>
    </>
  );
};