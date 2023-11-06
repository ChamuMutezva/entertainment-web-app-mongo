import React from "react";

function InputContent({
    type,
    name,
    onChange,
    label
}: Readonly<{
    type: string;
    name: string;
    onChange: any;
    label: string;
}>) {
    return (
        <div className="relative p-4">
            <input
                type={type}
                name={name}
                id={name}
                placeholder=""
                onChange={onChange}
                className="w-full text-white py-4 bg-semiDarkBlue border-b-white
            input:not(:placeholder-shown):bg-semiDarkBlue
             border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0 peer"
            />
            <label
                htmlFor={name}
                className="absolute flex items-center gap-2
             text-white top-6 left-8 transition-all text-base sm:text-2xl opacity-40"
            >
                {label}
            </label>
        </div>
    );
}

export default InputContent;
