import { Avatar } from "./avatar";
import { FeedbackControl } from "./FeedbackControl/feedback_control";

export const Summary = () => {
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
    </>
  );
};
