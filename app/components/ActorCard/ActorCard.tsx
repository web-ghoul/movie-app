import { ActorTypes } from "~/types/app";

const ActorCard = ({ actor }: { actor: ActorTypes }) => {
  return (
    <article className="pt-4 px-4 bg-neutral-900 border-[1px] border-neutral-700 border-solid rounded-xl grid justify-stretch items-start gap-3 grid-cols-[auto,1fr] transition-all duration-500 group hover:border-primary">
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${actor.profile_path}')`,
        }}
        className="bg-no-repeat bg-cover bg-center rounded-lg rounded-b-none h-[90px] w-[90px]"
      />
      <div className="grid justify-stretch items-center gap-1 text-white">
        <h6 className="font-[600] group-hover:text-primary transition-all duration-500">{actor.name}</h6>
        <h6 className="text-neutral-400">{actor.character}</h6>
      </div>
    </article>
  );
};

export default ActorCard;
