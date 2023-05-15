import React, { useContext } from "react";
import ChatInput from "./components/chat/input";

import { ChatMessageList } from "./components/chat_message_list";
import { Summary } from "./components/summary";
import SearchInput from "./components/chat/search_input";
import { SearchResponse } from "./types";
import { GlobalState } from "./store/provider";
import { cn } from "./lib/utils";

function Results({ searchResponse }: { searchResponse: SearchResponse }) {
  const api = useContext(GlobalState);

  const onSubmit = (query) => {
    api?.askQuestion(query);
  };

  const [summary, ...chatMessages] = api?.conversation || [];

  return (
    <>
      <div className="max-w-2xl mx-auto relative">
        <div className="flex">
          <div className="absolute -left-48 top-4">
            {searchResponse.facets.map((facet) => (
              <div className="w-44" key={facet.name}>
                <div className="facet__entries">
                  {facet.entries.map((entry) => (
                    <div
                      className={cn(
                        "flex mb-0 content-center justify-between py-1 cursor-pointer hover:text-blue-700",
                        {
                          "text-blue-500 font-semibold": api?.isSelected(
                            facet.name,
                            entry.value
                          ),
                        }
                      )}
                      key={entry.value}
                      onClick={() => {
                        api?.toggleFilter(facet.name, entry.value);
                      }}
                    >
                      <span className="flex-grow text-sm">{entry.value}</span>
                      <label className="justify-self-end bg-gray-200 rounded font-bold p-1 px-2 text-xs">
                        {entry.count}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-xl mt-4 p-6 rounded-xl border border-gray-200 mb-8">
          <div className="pb-10">
            <Summary
              text={summary?.content || api?.streamMessage}
              loading={api?.inProgressMessage}
            />
          </div>

          <div
            className={cn("chat border-t border-gray-300", {
              "border-0": chatMessages.length === 0,
            })}
          >
            <div className="chat__messages">
              <ChatMessageList
                messages={chatMessages}
                incomingMessage={(summary && api?.streamMessage) || null}
              />
            </div>
            <ChatInput isLoading={api?.inProgressMessage} onSubmit={onSubmit} />
          </div>
        </div>
        <h3 className="text-lg mb-4 font-bold">
          Search Results ({searchResponse.total})
        </h3>
        <div className="">
          {api?.searchResponse?.results.map((result) => (
            <div
              className="bg-white border border-gray-200 mb-4 p-4 rounded-md shadow-md"
              key={result.id}
            >
              <h4 className="text-md mb-1 font-semibold">{result.name[0]}</h4>
              <p className="text-sm">{result.content[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  const api = useContext(GlobalState);

  const onSearch = (query) => {
    api?.reset();
    api?.search(query, []);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <SearchInput onSearch={onSearch} />
      </div>

      {api?.loading && <div className="max-w-2xl mx-auto">loading...</div>}

      {api?.searchResponse && <Results searchResponse={api?.searchResponse} />}
    </div>
  );
}

export default App;
