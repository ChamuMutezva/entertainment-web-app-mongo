import React from "react";
import Image from "next/image";

function Background({
    src,
    priority,
    width,
    height,
    recommendedImg,
}: {
    src: string;
    priority: boolean;
    width: number;
    height: number;
    recommendedImg?: string;
}) {
    return (
        <Image
            src={src}
            alt=""
            priority={priority}
            quality={100}
            height={height}
            width={width}
            className={`max-w-full block rounded-lg z-0 object-contain ${recommendedImg}`}          
        />
    );
}

export default Background;
