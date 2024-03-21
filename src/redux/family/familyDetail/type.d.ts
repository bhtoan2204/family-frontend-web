export interface FamilyDetail {
    id_family: number,
    quantity: number,
    description: string,
    created_at: string,
    updated_at: string,
    name: string,
    owner_id: string,
    members: Member[]
}

export interface Member {
    id_user: String;
    email: String;
    phone: String;
    language: String | null;
    firstname: String;
    lastname: String;
    isOwner: boolean | null,
    accountType: String?,
    billingStatus: String?,
    authentication: String?,
    expiredDate: String?
}