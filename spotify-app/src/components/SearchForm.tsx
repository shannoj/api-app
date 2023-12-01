import { ChangeEvent, FormEvent } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

interface SearchFormProps {
  setSearchKey: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  searchArtists: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({ setSearchKey, searchArtists }: SearchFormProps) => {
  return (
    <>
      <form onSubmit={searchArtists}>
        <Input type="text" onChange={(e) => setSearchKey(e)} />
        <Button type={"submit"}>
          <Typography>Search</Typography>
        </Button>
      </form>
    </>
  );
};

export default SearchForm;
