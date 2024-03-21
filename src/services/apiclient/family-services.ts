import { Member } from "@/redux/family/familyDetail/type";
import { UserProfile } from "@/redux/user/userProfile/type";
import FamilyUrl from "@/services/url/family-url";
import axios, { AxiosResponse } from "axios";
const FamilyService = {
  getAllFamily: async (accessToken: String) => {
    try {
      const response = await axios.get(FamilyUrl.getAllFamily, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //   console.log(data);
      response.data.map((e: any) => {
        e.familyPhotoUrl = "https://www.w3schools.com/howto/img_avatar2.png";
      });
      return response.data as {
        id_family: number;
        quantity: number;
        description: String;
        created_at: String;
        updated_at: String;
        name: String;
        owner_id: String;
        familyPhotoUrl: String;
      }[];
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error fetching get all families data");
    }
  },
  getFamilyDetail: async (familyId: String, accessToken: String) => {
    try {
      const responseFamily = await axios.get(FamilyUrl.getFamily + familyId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //   console.log("...", responseFamily.data[0]);
      const familyInfo: {
        id_family: number;
        quantity: number;
        description: string;
        created_at: string;
        updated_at: string;
        name: string;
        owner_id: string;
        members: Member[] | null;
      } = responseFamily.data[0];
      const responseMembers = await axios.get(
        FamilyUrl.getAllMember + familyId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const membersDatas: {
        id_user: String;
        email: String;
        phone: String;
        language: String | null;
        firstname: String;
        lastname: String;
        avatarUrl: String | null;
        isOwner: boolean | null;
        accountType: String;
        billingStatus: String;
        authentication: String;
        expiredDate: String;
      }[] = responseMembers.data;
      membersDatas.map((a, index) => {
        a.avatarUrl = "https://www.w3schools.com/howto/img_avatar.png";
        if (a.id_user === familyInfo.owner_id) {
          a.isOwner = true;
        }
      });
      familyInfo.members = membersDatas;
      //   console.log("fam nè má", familyInfo);
      return familyInfo;
      return {};
    } catch (error: any) {
      console.log("duma may", error);
      throw new Error("Error getting family detail");
    }
  },
  getAllMember: async (familyId: String, accessToken: String) => {
    try {
      const response = await axios.get(FamilyUrl.getAllMember + familyId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      response.data.map((a: any) => {
        a.avatarUrl = "https://www.w3schools.com/howto/img_avatar2.png";
      });
      return response.data as {
        id_user: String;
        email: String;
        phone: String;
        language: String | null;
        firstname: String;
        lastname: String;
        avatarUrl: String;
      }[];
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error fetching user data");
    }
  },
  inviteMember: async ({
    id_family,
    accessToken,
    gmail,
    phone,
    role,
  }: {
    id_family: number;
    accessToken: String;
    gmail: String;
    phone: String;
    role: String;
  }) => {
    try {
      console.log("đụ mẹ mày nha", {
        id_family: id_family,
        gmail: gmail,
        phone: phone,
        role: role,
      });
      await axios.post(
        FamilyUrl.inviteMember,
        {
          id_family: id_family,
          gmail: gmail,
          phone: phone,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error inviting member");
    }
  },
  createFamily: async (
    accessToken: String,
    name: String,
    description: String
  ) => {
    try {
      console.log(accessToken, name, description);
      const response = await axios.post(
        FamilyUrl.createFamily,
        {
          name: name,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data as number;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error creating family");
    }
  },
  deleteMember: async (
    familyId: number,
    userId: String,
    accessToken: String
  ) => {
    const dat = {
      id_family: familyId,
      id_user: userId,
    };
    const res = await axios.delete(FamilyUrl.deleteMember, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        id_family: familyId,
        id_user: userId,
      },
    });
    return res.data;
  },
};
export default FamilyService;
