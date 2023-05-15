import { cn } from "../../lib/utils";
import { useState } from "react";

export default function SearchInput({ onSearch, searchActive }) {
  const [query, setQuery] = useState<string>("");
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (query.length === 0) return;
        onSearch(query);
      }}
    >
      <label className="text-xs font-bold leading-none text-gray-900">
        Search everything
      </label>
      <div className="flex w-full items-center space-x-2 mt-1">
        <input
          type="text"
          className="outline-none border border-gray-300 rounded-md px-3 py-2 w-full text-base font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="search"
        />
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 min-w-fit",
            "bg-primary text-primary-foreground hover:bg-primary/90 opacity-100 bg-gray-700 text-white"
            )}
          type="submit"
        >
          {searchActive ? "Start over" : "Search"}
        </button>
      </div>
    </form>
  );
}
