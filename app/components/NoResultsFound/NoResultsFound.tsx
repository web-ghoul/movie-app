import { useSearchParams } from "@remix-run/react";

const NoResultsFound = () => {
  const [searchParams] = useSearchParams();

  return (
    <article className="border-[1px] border-solid border-neutral-700 bg-neutral-900 w-[25vw] xl:w-[40vw] lg:w-[60vw] md:!w-full  h-fit grid justify-center items-center gap-4 p-6 pb-12 rounded-xl text-white text-center m-auto">
      <h2>🔍</h2>
      <div className="grid justify-stretch items-center gap-3">
        <h4 className="!font-[600]">No results found</h4>
        <h6
          className={`text-neutral-500`}
        >{`We couldn't find any results for "${searchParams.get(
          "search"
        )}". Try adjusting your search or browse our trending content.`}</h6>
      </div>
    </article>
  );
};

export default NoResultsFound;
