import { Avatar } from "./avatar";
import { FeedbackControl } from "./FeedbackControl/feedback_control";
import { BeatLoader } from "react-spinners";
import { SourceItem, SourceType } from "./source_item";
import { Result } from "../types";

export const Summary = ({
  text,
  loading,
  sources,
}: {
  text: string | undefined;
  loading: boolean;
  sources: SourceType[];
}) => {
  return (
    <>
      <header className="flex flex-row justify-between mb-8">
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
      <div className="text-base leading-tight text-gray-800 whitespace-pre-wrap mb-8">
        {text}
      </div>
      {sources.map((source) => (
        <SourceItem name={source.name} icon={source.icon} href={source.href} />
      ))}
    </>
  );
};