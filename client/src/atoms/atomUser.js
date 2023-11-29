import { atom } from "jotai";
// import { useAtom } from "jotai";

const userAtom = atom(() => {
    return JSON.parse(localStorage.getItem("user"))
});

export default userAtom
