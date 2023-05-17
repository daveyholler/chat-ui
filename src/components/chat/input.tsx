import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import Conversation from "../images/conversation";
import SendIcon from "../images/SendIcon";
import autosize from "autosize";

export default function ChatInput({ isLoading, onSubmit }) {
  const [message, setMessage] = useState<string>();
  const textareaReference = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13 && !event.shiftKey && message && message.trim().length > 0) {
        event.preventDefault();

        onSubmit(message);
        setMessage("");
        autosize.destroy(textareaReference.current);
      }

    },
    [message, onSubmit]
  );

  useEffect(() => {
    const ref = textareaReference?.current;
    autosize(textareaReference.current);

    if (!isLoading && ref) {
      ref.focus();
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    const ref = textareaReference?.current;

    autosize(ref);

    return () => {
      autosize.destroy(ref);
    };
  }, []);

  return (
    <form className="flex space-x-2 relative">
      <textarea
        className="w-full h-10 p-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white pl-9"
        ref={textareaReference}
        value={message}
        placeholder="Ask a follow up question about this answer"
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          autosize(textareaReference.current);
          setMessage(event.target.value);
        }}
      ></textarea>
      <span className="absolute left-1 top-3"><Conversation /></span>
      <button
        disabled={!message || message?.length === 0}
        type="submit"
        className={cn(
          "bg-blue-400 text-white px-4 py-2 h-10 rounded-md border border-blue-300 disabled:opacity-30 cursor-pointer inline-flex"
        )}
      >Send <span className="ml-3"><SendIcon /></span>
      </button>

    </form>
  );
}
