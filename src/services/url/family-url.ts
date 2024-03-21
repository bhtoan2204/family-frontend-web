import { baseUrl } from "@/services/url";

const FamilyUrl = {
    getAllFamily: `${baseUrl}/api/v1/family/getAllFamily`,
    getFamily: `${baseUrl}/api/v1/family/getFamily?id_family=`,
    getAllMember: `${baseUrl}/api/v1/family/getAllMember?id_family=`,
    createFamily: `${baseUrl}/api/v1/family/createFamily`,
    inviteMember: `${baseUrl}/api/v1/family/addMember`,
    deleteMember: `${baseUrl}/api/v1/family/deleteMember`,
}
export default FamilyUrl;