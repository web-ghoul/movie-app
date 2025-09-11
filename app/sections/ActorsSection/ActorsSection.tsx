import { useSelector } from "react-redux";
import ActorCard from "~/components/ActorCard/ActorCard";
import Title from "~/components/Title/Title";
import { RootState } from "~/store/store";

const ActorsSection = () => {
  const { cast } = useSelector((state: RootState) => state.cast);

  return (
    <section
      className={`grid justify-stretch items-center gap-8 contain contain_y md:gap-6 sm:!gap-4`}
    >
      <Title text={"Actors"} />
      <div className="grid justify-stretch items-center gap-6 grid-cols-3 md:grid-cols-2 sm:!grid-cols-1 lg:gap-5  md:gap-4 sm:!gap-3">
        {cast.slice(0, 15).map((actor, i) => (
          <ActorCard actor={actor} key={i} />
        ))}
      </div>
    </section>
  );
};

export default ActorsSection;
