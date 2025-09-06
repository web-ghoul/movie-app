import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";

const DropDown = () => {
    const [status, setStatus] = useState(0)
    const [currentStatus, setCurrentStatus] = useState("Movies & TV Shows")

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
                        setStatus(0)
                        setCurrentStatus("Movies & TV Shows")
                    }}
                >Movies & TV Shows</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={status === 1}
                    onCheckedChange={() => {
                        setStatus(1)
                        setCurrentStatus("Movies")
                    }}>Movies</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={status === 2}
                    onCheckedChange={() => {
                        setStatus(2)
                        setCurrentStatus("TV Shows")
                    }}>TV Shows</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={status === 3}
                    onCheckedChange={() => {
                        setStatus(3)
                        setCurrentStatus("Animes")
                    }}>Animes</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown

