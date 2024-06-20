import { BaseModel } from "./model.base";

export class FamilyMember extends BaseModel {
    public id_user!: string;
    public email!: string;
    public phone!: string | null;
    public language!: string | null;
    public firstname!: string;
    public lastname!: string;
    public id_family!: number;
    public role!: string;
    public avatar!: string | null;
}