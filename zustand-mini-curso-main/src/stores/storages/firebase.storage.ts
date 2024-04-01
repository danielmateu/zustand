import { StateStorage, createJSONStorage } from "zustand/middleware"

const firebaseUrl = 'https://zustand-storage-123d7-default-rtdb.europe-west1.firebasedatabase.app/zustand'

const storageAPI: StateStorage = {

    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json())
            console.log(data);
            return JSON.stringify(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        // throw new Error("Function not implemented.")
        // console.log('setItem', name, value);
        const data = await fetch(`${firebaseUrl}/${name}.json`, {
            method: 'PUT',
            body: value
        }).then(res => res.json())

        console.log(data);

        return;
    },
    removeItem: function (name: string): void | Promise<void> {
        // throw new Error("Function not implemented.")
        // console.log('removeItem', name);
        sessionStorage.removeItem(name)
    }
}

export const firebaseStorage = createJSONStorage(() => storageAPI)