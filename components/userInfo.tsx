import React from "react";

function UserInfo() {
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zinc-400 flex flex-col gap-2 my-6">
                Name: <span className="font-bold">Chamu</span>
            </div>
            <div>
                Email: <span className="font-bold">chamu@gmail.com</span>
            </div>
            <button className="bg-[red] text-white font-bold px-6 py-2 mt-3">
                Log out
            </button>
        </div>
    );
}

export default UserInfo;
