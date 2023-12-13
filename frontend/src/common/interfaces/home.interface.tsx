import { ICard } from "./card.interface";

export interface IHome {
    user_name: string;
    location_home: string;
    index_home: number;
    cards: ICard[];
}