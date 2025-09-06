import { ReactNode, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Input = ({
    name,
    placeholder,
    type,
    label,
    variant = "default",
    icon
}: {
    name: string;
    placeholder?: string;
    label?: string;
    type?: string;
    variant?: "default" | "outline"
    icon?: ReactNode
}) => {
    const [show, setShow] = useState(false);
    const [focus, setFocus] = useState(false);

    return (
        <div className={`grid justify-stretch items-center gap-1`}>
            {label && <label htmlFor={name} className="subtitle_1">
                {label}
            </label>}
            <div
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={`border-[1px] border-solid border-neutral-700 rounded-lg overflow-hidden bg-neutral-900 flex justify-stretch items-center gap-4 h-10 px-4 [&>svg]:text-neutral-600 [&>svg]:text-xl ${focus && "!border-primary"
                    }`}
            >
                {icon}
                <input
                    type={type === "password" ? (show ? "text" : type) : type || "text"}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className={`outline-none border-none subtitle_1 w-full py-2 !bg-neutral-900 text-white`}
                />
                {type === "password" &&
                    (show ? (
                        <IoMdEye
                            className="cursor-pointer text-xl"
                            onClick={() => setShow(!show)}
                        />
                    ) : (
                        <IoMdEyeOff
                            className="cursor-pointer text-xl"
                            onClick={() => setShow(!show)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Input;