import React from "react"
import SearchSVG from "./icons/SearchSVG"

interface Props {
  search: string
  setSearch: (search: string) => void
}

const SearchLine: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <>
      <div className="p-4">
        <form className="flex items-center w-1/2">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchSVG className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2"
              placeholder="Search for title, tags"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default SearchLine
