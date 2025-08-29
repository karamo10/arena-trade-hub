export type Product = {
    id: number;
    name: string;
    image_url: string;
    price: number;
    categorie: string;
    description: string;
    instock?: boolean
};

export type TopSale = {
    id: number;
    name: string;
    price: number
    image_url: string;
}

export type AboutService = {
    id: number;
    title: string;
    icon: string;
    description: string;
}