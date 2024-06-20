import { BaseModel } from "./model.base";

export class FamilyInvitation extends BaseModel {
    public id_invitation!: number;
    public id_family!: number;
    public code!: string;
}
