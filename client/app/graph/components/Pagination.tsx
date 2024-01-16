import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  page: number;
  pageSize: number;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
}

export default function PaginationDemo({
  page,
  pageSize,
  setPage,
  setPageSize,
}: IProps) {
  return (
    <Pagination className="my-4">
      <PaginationContent>
        {page !== 1 && <PaginationPrevious onClick={() => setPage(page - 1)} />}
        <PaginationLink isActive>{page}</PaginationLink>
        <PaginationNext onClick={() => setPage(page + 1)} />
      </PaginationContent>
      <Select
        name="searchBy"
        onValueChange={(value) => setPageSize(Number(value))}
        value={pageSize.toString()}
      >
        <SelectTrigger
          className="w-[150px] focus:ring-transparent border-gray-500"
          id="framework"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="popper">
          {[5, 10, 20].map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Pagination>
  );
}
