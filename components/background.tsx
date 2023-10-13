import React from "react";
import Image from "next/image";

function Background({ src, priority }: { src: string; priority: boolean }) {
    return (
        <Image
            src={src}
            alt=""
            priority
            quality={100}
            height={220}
            width={328}
            className="max-w-full block"
            style={{
                objectFit: "cover",
                zIndex: 0,
            }}
        />
    );
}

export default Background;
