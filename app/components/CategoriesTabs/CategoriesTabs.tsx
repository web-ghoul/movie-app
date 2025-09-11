import { useEffect, useRef, useState } from "react";
import { useApp } from "~/contexts/AppContext";

const CategoriesTabs = ({
  cats,
  variant,
}: {
  cats: string[];
  variant: "trendy" | "rated";
}) => {
  const { dispatch: dispatchApp } = useApp();
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsRef.current) {
      const currentTab = tabsRef.current.children[active] as HTMLElement;
      if (currentTab) {
        setIndicatorStyle({
          left: currentTab.offsetLeft,
          width: currentTab.offsetWidth,
        });
      }
    }
  }, [active]);

  return (
    <div
      ref={tabsRef}
      className="flex justify-center items-center gap-6 text-white relative border-b border-gray-600"
    >
      {cats.map((label, index) => (
        <span
          key={index}
          onClick={() => {
            dispatchApp({
              type: `${variant}Tab`,
              payload: label.toLowerCase(),
            });
            setActive(index);
          }}
          className={`py-2 cursor-pointer subtitle_1 font-[600] transition-colors ${
            active === index ? "text-primary" : "text-white"
          }`}
        >
          {label}
        </span>
      ))}

      <span
        className="absolute bottom-[-2px] h-[2px] bg-primary shadow-t-xl shadow-t-primary transition-all duration-300 rounded-full"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      ></span>
    </div>
  );
};

export default CategoriesTabs;
