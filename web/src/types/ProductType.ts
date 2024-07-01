export interface IProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity : number
}

export interface ICart {
    id: number,
    sessionId: string,
    items: string,
    total: number,
    createdAt: Date,
    updatedAt: Date
}