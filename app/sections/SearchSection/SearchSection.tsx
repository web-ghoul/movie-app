import { IoSearch } from "react-icons/io5"
import { PiShootingStarFill } from "react-icons/pi"
import DropDown from "~/components/DropDown/DropDown"
import Input from "~/components/Input/Input"

const SearchSection = () => {
  return (
    <section className={`grid justify-center items-center gap-10 text-center contain contain_y`}>
      <div className="grid justify-center items-center gap-1 text-center">
        <div className="grid grid-cols-[1fr,auto,1fr] just fy-center items-center gap-4 w-fit m-auto text-white">
          <PiShootingStarFill className="text-primary text-3xl rotate-[-90deg]" />
          <h2 className="font-[700]">Discover Your Next Favorite</h2>
          <PiShootingStarFill className="text-primary text-3xl" />
        </div>
        <h6 className="text-neutral-300">Search through thousands of movies, TV shows, and anime series</h6>
      </div>
      <div className="grid grid-cols-[auto,1fr] justify-stretch items-center gap-2 p-4 bg-neutral-900 border-[1px] border-neutral-700 rounded-xl w-[50vw] 3xl:w-[55vw] 2xl:w-[65vw] lg:w-[80vw] md:!w-full">
        <DropDown />
        <Input name={"search"} placeholder={"Type here to search..."} icon={<IoSearch />} />
      </div>
    </section>
  )
}

export default SearchSection