import { Avatar } from "./avatar";
import { FeedbackControl } from "./FeedbackControl/feedback_control";
import { BeatLoader } from "react-spinners";

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
        <div className="flex flex-row justify-center align-middle items-center">
          <Avatar></Avatar>
          {loading && (
            <div className="ml-4">
              <BeatLoader size={7} />
            </div>
          )}
        </div>
        <FeedbackControl></FeedbackControl>
      </header>
      <div className="text-lg leading-normal text-gray-800">{text}</div>
    </>
  );
};
