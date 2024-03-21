export interface UserProfile {
    id_user: string;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    language: string | null;
    twofa: boolean;
    created_at: string;
    updated_at: string;
    isemailverified: boolean;
    isphoneverified: boolean;
    isadmin: boolean;
    login_type: string;
    avatar: string | null;
  }
