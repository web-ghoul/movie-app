const Title = ({ text }: { text: string }) => {
  return (
    <div
      className={`flex justify-start items-center gap-2 text-white font-[700]`}
    >
      <div className="bg-primary rounded-xl w-[7px] h-full text-primary">.</div>
      <h3>{text}</h3>
    </div>
  );
};

export default Title;
