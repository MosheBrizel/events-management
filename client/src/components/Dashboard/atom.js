import { atom, useAtom } from "jotai";

const atomEvent = atom(null);

export function useEvent() {
  return useAtom(atomEvent);
}
