import React from "react";
import ChatInput from "./components/chat/input";

import { ChatMessageList } from "./components/chat_message_list";
import { Summary } from "./components/summary";
import SearchInput from "./components/chat/search_input";
import { SearchResponse } from "./types";
import {
  actions,
  isFacetSelected,
  thunkActions,
  useAppDispatch,
  useAppSelector
} from "./store/provider";
import { cn } from "./lib/utils";
import { BeatLoader } from "react-spinners";

function Results({ searchResponse }: { searchResponse: SearchResponse }) {
  const conversation = useAppSelector((state) => state.conversation);
  const streamMessage = useAppSelector((state) => state.streamMessage);
  const inProgressMessage = useAppSelector((state) => state.inProgressMessage);
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const onSubmit = (query) => {
    dispatch(thunkActions.askQuestion(query));
  };

  const [summary, ...chatMessages] = conversation;

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
                          "text-blue-500 font-semibold": isFacetSelected(
                            filters,
                            facet.name,
                            entry.value
                          ),
                        }
                      )}
                      key={entry.value}
                      onClick={() => {
                        dispatch(
                          thunkActions.toggleFilter(facet.name, entry.value)
                        );
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
              text={summary?.content || streamMessage}
              loading={!!inProgressMessage}
              sources={streamMessage ? [] : summary?.sources || []}
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
                incomingMessage={(summary && streamMessage) || null}
              />
            </div>
            <ChatInput isLoading={inProgressMessage} onSubmit={onSubmit} />
          </div>
        </div>
        <h3 className="text-lg mb-4 font-bold">
          Search Results
        </h3>
        <div className="">
          {searchResponse?.results.map((result) => (
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
  const dispatch = useAppDispatch();
  const searchResponse = useAppSelector((state) => state.searchResponse);
  const loading = useAppSelector((state) => state.loading);

  const onSearch = (query) => {
    dispatch(actions.reset());
    dispatch(thunkActions.search(query, []));
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <SearchInput onSearch={onSearch} searchActive={searchResponse} />
      </div>

      {loading && !searchResponse && (
        <div className="relative w-24 mx-auto py-10 opacity-30">
          <BeatLoader size={15} />
        </div>
      )}

      {searchResponse && <Results searchResponse={searchResponse} />}
    </div>
  );
}

export default App;
