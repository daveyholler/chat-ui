import { Avatar } from "./avatar";
import { FeedbackControl } from "./FeedbackControl/feedback_control";

export const Summary = ({ text, loading }) => {
  const styles = {
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "2rem",
    },
  };
  return (
    <>
      <header style={styles.header as React.CSSProperties}>
        <Avatar></Avatar>
        <FeedbackControl></FeedbackControl>
      </header>
      <div className="text-lg leading-normal text-gray-800">
        {loading && <div>loading...</div>}
        {text}
      </div>
    </>
  );
};
