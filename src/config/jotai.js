import { atomWithStorage } from "jotai/utils"

export const initialAtom = {
    user: null,
    token: null,
}

export const authStorage = atomWithStorage("kengoro::auth", initialAtom)