import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Movies & TV Shows");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      if (type === "all") {
        setCurrentStatus("Movies & TV Shows");
      } else if (type === "tv") {
        setCurrentStatus("TV Shows");
      } else if (type === "movie") {
        setCurrentStatus("Movies");
      }
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          {currentStatus}
          <GoChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuCheckboxItem
          checked={status === 0}
          onCheckedChange={() => {
            setStatus(0);
            setCurrentStatus("Movies & TV Shows");
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("type", "all");
              return newParams;
            });
          }}
        >
          Movies & TV Shows
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status === 1}
          onCheckedChange={() => {
            setStatus(1);
            setCurrentStatus("Movies");
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("type", "movie");
              return newParams;
            });
          }}
        >
          Movies
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status === 2}
          onCheckedChange={() => {
            setStatus(2);
            setCurrentStatus("TV Shows");
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("type", "tv");
              return newParams;
            });
          }}
        >
          TV Shows
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
