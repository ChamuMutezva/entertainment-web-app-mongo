import React from "react";
import Image from "next/image";

function Background({
    src,
    priority,
    width,
    height,
}: {
    src: string;
    priority: boolean;
    width: number;
    height: number;
}) {
    return (
        <Image
            src={src}
            alt=""
            priority={priority}
            quality={100}
            height={height}
            width={width}
            className="max-w-full block"
            style={{
                objectFit: "cover",
                zIndex: 0,
            }}
        />
    );
}

export default Background;
