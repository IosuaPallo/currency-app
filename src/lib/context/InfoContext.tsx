"use client"

import {createContext, FC, PropsWithChildren, useContext, useState} from "react";

type InfoContextType = {
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    amount: number;
    setAmount: (amount: number) => void;

}

const InfoContext = createContext<InfoContextType>({
    phoneNumber: "", setPhoneNumber: (phoneNumber) => {
    },
    amount: 0, setAmount: (amount) => {
    }
});

export const InfoContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState(0);

    const updatePhoneNumber = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber)
    };

    const updateAmount = (amount: number) => {
        setAmount(amount)
    };

    return <>
        <InfoContext.Provider
            value={{
                phoneNumber: phoneNumber,
                setPhoneNumber: updatePhoneNumber,
                amount: amount,
                setAmount: updateAmount
            }}
        >
            {children}
        </InfoContext.Provider>
    </>
}

export const useInfoContext = (): InfoContextType => {
    const context = useContext(InfoContext)
    if (!context) {
        throw new Error(
            "useInfoContext must be used within a InfoContextProvider",
        );
    }
    return context;
}