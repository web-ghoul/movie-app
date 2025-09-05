const Overlay = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute bottom-0 w-full h-full left-0 bg-overlay transition-all ${className}`}
    ></div>
  );
};

export default Overlay;
