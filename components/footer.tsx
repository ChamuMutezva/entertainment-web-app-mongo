import React from "react";

function Footer() {
    return (
        <footer className="py-8 px-4 text-white">
            <p className="text-center">
                This is a solution to the
                <a
                    href="https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X"
                    className="text-[skyBlue] font-bold hover:opacity-60 focus:opacity-60"
                >
                    <span className="pl-2">
                        Entertainment web app challenge on Frontend Mentor{" "}
                    </span>
                </a>
                created by
                <a
                    href="https://github.com/ChamuMutezva/entertainment-web-app-mongo"
                    className="text-[skyBlue] font-bold hover:opacity-60 focus:opacity-60"
                >
                    {" "}
                    Chamu Mutezva
                </a>
            </p>
            <p className="text-center">
                Frontend Mentor challenges help you improve your coding skills
                by building realistic project.
            </p>
        </footer>
    );
}

export default Footer;
