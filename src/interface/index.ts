import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    quantity: number,
    rating: { rate: number, count: number },
}

export interface ContextType {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}

export interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}