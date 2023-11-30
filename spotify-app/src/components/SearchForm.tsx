import { ChangeEvent, FormEvent } from "react";

interface SearchFormProps {
  setSearchKey: (e: ChangeEvent<HTMLInputElement>) => void;
  searchArtists: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({ setSearchKey, searchArtists }: SearchFormProps) => {
  return (
    <>
      <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e)} />
        <button type={"submit"}>Search</button>
      </form>
    </>
  );
};

export default SearchForm;
