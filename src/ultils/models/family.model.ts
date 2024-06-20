import { BaseModel } from "./model.base";

export class Family extends BaseModel {
    public id_family!: number;
    public quantity!: number;
    public description!: string | null;
    public created_at!: string;
    public updated_at!: string;
    public name!: string;
    public expired_at!: string | null;
    public avatar!: string | null;
    public owner_id!: string;
}