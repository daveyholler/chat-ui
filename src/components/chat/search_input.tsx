import { useState } from "react";
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState<string>("");
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}

    >
      <label className="text-xs font-bold leading-none text-gray-900">Search everything</label>
      <div className="flex w-full items-center space-x-2 mt-1">
        <input type="text"
          className="outline-none border border-gray-300 rounded-md px-3 py-2 w-full text-base font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="search" />
        <button
          className="inline-flex bg-gray-600 text-white items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          type="submit">Search</button>
      </div>
      
    </form>
  );
}
