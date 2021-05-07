import { Product } from "src/api/product/dto/product.dto";

export interface User {
    id: string,
    name: string,
    points: number,
    redeemHistory: Product[],
    createDate: string
}
