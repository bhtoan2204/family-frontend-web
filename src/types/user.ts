export type User = {
  id_user: string;
  email: string;
  phone: string;
  language: string;
  twofa: boolean;
  created_at: string;
  updated_at: string;
  isphoneverified: boolean;
  isadmin: boolean;
  firstname: string;
  lastname: string;
  isemailverified: boolean;
  avatar: string;
  login_type: string;
  birthdate: string | null;
  genre: string | null;
};
