"use client";
import { ChangeEvent, useState } from "react";
import { TParamsToChange } from "@/common/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "next/dist/server/utils";

const optionList = [
  { value: "search", label: "All" },
  { value: "categoryName", label: "Category" },
  { value: "title", label: "Title" },
];

interface IProps {
  onSearchChange: (params: TParamsToChange) => void;
}

export default function Search({ onSearchChange = () => {} }: IProps) {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(optionList[0].value);

  const onSearch = debounce(() => {
    onSearchChange({ [searchBy]: search });
  }, 500);

  const handleChange = debounce((value: string) => {
    onSearchChange({ [searchBy]: value });
  }, 500);

  return (
    <div className="flex p-4 w-full justify-center">
      <form
        className="flex mb-8 "
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Select
          name="searchBy"
          onValueChange={(value) => setSearchBy(value)}
          value={searchBy}
        >
          <SelectTrigger
            className="border-r-0 rounded-r-none w-[102px] min-w-[102px] focus:ring-transparent border-gray-500"
            id="framework"
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {optionList.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Search podcasts"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
            handleChange(event.target.value);
          }}
          className={
            "rounded-l-none rounded-r-none border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
          }
        />
        <Button type="submit" className="rounded-l-none">
          Search
        </Button>
      </form>
    </div>
  );
}
