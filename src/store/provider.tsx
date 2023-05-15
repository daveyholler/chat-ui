import { useReducer, createContext } from "react";
import { SearchResponse } from "../types";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChatMessageType } from "../components/chat_message";

// Define the initial state
type GlobalStateType = {
  filters: Record<string, string[]>;
  searchResponse: SearchResponse | null;
  query: string;
  loading: boolean;
  streamMessage: string;
  conversation: ChatMessageType[];
  inProgressMessage: boolean;
};

const GLOBAL_STATE: GlobalStateType = {
  filters: {},
  searchResponse: null,
  query: "",
  loading: false,
  streamMessage: "",
  conversation: [],
  inProgressMessage: false,
};

const API_HOST = "http://127.0.0.1:4000";
// const API_HOST =
//   "https://workplace-search-openai-20-app.staging-3.eden.elastic.dev/api";
const defaultHeaders = {
  Authorization: "Basic ZWxhc3RpYzplbGFzdGljTVNCdWlsZCE=",
  "Content-Type": "application/json",
};
// Define the reducer
const globalReducer = (state, action): GlobalStateType => {
  switch (action.type) {
    case "SET_STREAM_MESSAGE":
      return { ...state, streamMessage: action.payload.streamMessage };
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversation: [...state.conversation, action.payload.conversation],
      };
    case "SET_SEARCH_RESPONSE":
      return { ...state, searchResponse: action.payload.searchResponse };
    case "SET_QUERY":
      return { ...state, query: action.payload.query };
    case "SET_LOADING":
      return { ...state, loading: action.payload.loading };
    case "SET_IN_PROGRESS_MESSAGE":
      return { ...state, inProgressMessage: action.payload.inProgressMessage };
    case "SET_FILTERS":
      return { ...state, filters: action.payload.filters };
    case "RESET":
      return { ...GLOBAL_STATE };
    default:
      return state;
  }
};
// Create the context
interface API extends GlobalStateType {
  search: (query: string, filters: string[]) => void;
  reset: () => void;
  askQuestion: (query: string) => void;
  toggleFilter: (filter: string, value: string) => void;
  isSelected: (filter: string, value: string) => boolean;
}

export const GlobalState = createContext<API | null>(null);
GlobalState.displayName = "GlobalState";
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, GLOBAL_STATE);
  const api = {
    ...state,
    reset: () => {
      dispatch({
        type: "RESET"
      });
    },
    search: async (query, filters) => {
      dispatch({ type: "SET_LOADING", payload: { loading: true } });
      dispatch({ type: "SET_QUERY", payload: { query } });
      dispatch({ type: "SET_FILTERS", payload: { filters } });

      dispatch({
        type: "SET_IN_PROGRESS_MESSAGE",
        payload: { inProgressMessage: true },
      });

      const response = await fetch(`${API_HOST}/search`, {
        method: "POST",
        body: JSON.stringify({
          query: query,
          filters: filters,
          conversation_id: state.searchResponse?.conversation_id,
        }),
        headers: defaultHeaders,
      });

      const searchResponse = (await response.json()) as SearchResponse;
      dispatch({
        type: "SET_SEARCH_RESPONSE",
        payload: { searchResponse },
      });

      dispatch({ type: "SET_LOADING", payload: { loading: false } });

      let message = "";

      await fetchEventSource(`${API_HOST}/completions`, {
        method: "POST",
        openWhenHidden: true,
        body: JSON.stringify({
          streaming_id: searchResponse.streaming_id,
        }),
        headers: defaultHeaders,
        async onmessage(event) {
          if (event.data !== "[DONE]") {
            message += event.data === "" ? `${event.data} \n` : event.data;
            dispatch({
              type: "SET_STREAM_MESSAGE",
              payload: { streamMessage: message },
            });
          } else {
            dispatch({
              type: "ADD_CONVERSATION",
              payload: {
                conversation: {
                  isHuman: false,
                  content: message + "",
                  id: state.conversation.length + 1,
                },
              },
            });

            dispatch({
              type: "SET_STREAM_MESSAGE",
              payload: { streamMessage: null },
            });

            dispatch({
              type: "SET_IN_PROGRESS_MESSAGE",
              payload: { inProgressMessage: false },
            });
          }
        },
      });
    },
    askQuestion: async (query) => {
      dispatch({
        type: "ADD_CONVERSATION",
        payload: {
          conversation: {
            isHuman: true,
            content: query,
            id: state.conversation.length + 1,
          },
        },
      });

      await api.search(query, state.filters);
    },
    toggleFilter: async (filter: string, value: string) => {
      let stateFilters = {
        category: [...(state.filters.category || [])],
      };
      if (!stateFilters[filter]) {
        stateFilters[filter] = [];
      }
      const filterExists = state.filters[filter]?.includes(value);
      const filterValues = filterExists
        ? stateFilters[filter].filter((f) => f === filter)
        : stateFilters[filter].concat(value);

        debugger

      stateFilters = {
        ...stateFilters,
        [filter]: filterValues,
      };

      dispatch({
        type: "ADD_CONVERSATION",
        payload: {
          conversation: {
            isHuman: true,
            content: filterExists ? `Removing ${value}` : `Adding ${value}`,
            id: state.conversation.length + 1,
          },
        },
      });

      dispatch({
        type: "SET_FILTERS",
        payload: { filters: stateFilters },
      });

      await api.search(state.query, stateFilters);
    },
    isSelected: (filter: string, value: string) => {
      return state.filters[filter]?.includes(value);
    },
  };
  // Wrap the context provider around our component
  return <GlobalState.Provider value={api}>{children}</GlobalState.Provider>;
};
