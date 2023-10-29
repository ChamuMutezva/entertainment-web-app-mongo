import React from "react";

function Footer() {
    return (
        <footer className="py-8 px-4 text-white">
            <p className="text-center font-extralight">
                This is a solution to the
                <a
                    href="https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X"
                    target="_blank"
                    className="text-[skyBlue] font-extralight hover:opacity-60 focus:opacity-60"
                >
                    <span className="pl-2">
                        Entertainment web app challenge on Frontend Mentor{" "}
                    </span>
                </a>
                created by
                <a
                    target="_blank"
                    href="https://github.com/ChamuMutezva/entertainment-web-app-mongo"
                    className="text-[skyBlue] font-extralight hover:opacity-60 focus:opacity-60"
                >
                    {" "}
                    Chamu Mutezva
                </a>
            </p>
            <p className="text-center font-extralight">
                Frontend Mentor challenges help you improve your coding skills
                by building realistic project.
            </p>
        </footer>
    );
}

export default Footer;
