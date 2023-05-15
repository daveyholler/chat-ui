import { useCallback, useEffect, useRef, useState } from "react";
import autosize from "autosize";

export default function ChatInput({ isLoading, onSubmit }) {
  const [message, setMessage] = useState<string>();
  const textareaReference = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();

        onSubmit(message);
        setMessage("");

        autosize.destroy(textareaReference?.current);

      }
    },
    [message, onSubmit]
  );

  useEffect(() => {
    const ref = textareaReference?.current;

    if (!isLoading && ref) {
      ref.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    const ref = textareaReference?.current;

    autosize(ref);

    return () => {
      autosize.destroy(ref);
    };
  }, []);

  return (
    <div>
      <div>
        <div>
          <textarea
            className="w-full min-h-6 p-2 border border-gray-300 rounded-md"
            ref={textareaReference}
            value={message}
            placeholder="Send a message"
            onKeyDown={handleKeyDown}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
