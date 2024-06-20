import { apiDomain } from "./@constants";
import { dataInjection, ModelError, TPayload } from "./@ultilities";
import { BaseModel } from "./model.base";

export class User extends BaseModel {
    public static prefix = "api/v1";

    public id_user!: string;
    public email!: string;
    public phone!: string;
    public language!: string;
    public twofa!: boolean;
    public created_at!: string;
    public updated_at!: string;
    public isphoneverified!: boolean;
    public isadmin!: boolean;
    public firstname!: string;
    public lastname!: string;
    public isemailverified!: boolean;
    public avatar!: string | null;
    public login_type!: string;
    public birthdate!: string;
    public genre!: string;

    /**
     * Get profile info handler
     * @param args 
     * @returns 
     */
    public static async profile(
        args: Required<{
            token: string;
        }>
    ) {
        try {
            const response = await fetch(`${apiDomain}/${this.prefix}/user/profile`, {
                method: "GET",
                cache: "no-store",
                headers: {
                    // "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${args.token}`
                }
            });

            if (!response.ok) {
                return new ModelError(await response.json());
            }

            const payload = await response.json() as TPayload<any>;

            return dataInjection(User, payload.data);
        }
        catch (error) {
            console.error(error);
            return User.internalClientError;
        }
    }

    /**
     * Login handler
     * @param args 
     * @returns 
     */
    public static async login(
        args: Required<{
            email: string;
            password: string;
        }>
    ) {
        try {
            const response = await fetch(`${apiDomain}/${this.prefix}/auth/local/login`, {
                method: "POST",
                cache: "no-store",
                headers: {
                    // "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(args)
            });

            if (!response.ok) {
                return new ModelError(await response.json());
            }

            const payload = await response.json() as {
                accessToken: string;
                refreshToken: string;
                accessTokenExpiresIn: number;
                refreshTokenExpiresIn: number;
            };

            return payload;
        }
        catch (error) {
            console.error(error);
            return User.internalClientError;
        }
    }

    /**
     * Logout handler
     * @param args 
     * @returns 
     */
    public static async logout(
        args: Required<{
            token: string;
        }>
    ) {
        try {
            const response = await fetch(`${apiDomain}/${this.prefix}/auth/logout`, {
                method: "POST",
                cache: "no-store",
                headers: {
                    // "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${args.token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                return new ModelError(await response.json());
            }

            const payload = await response.json() as TPayload<any>;

            console.log("Logout payload", payload);
        }
        catch (error) {
            console.error(error);
            return User.internalClientError;
        }
    }

    /**
     * Register new account handler
     * @param args 
     * @returns 
     */
    public static async register(
        args: Required<{
            email: string;
            phone: string;
            password: string;
            firstname: string;
            lastname: string;
            genre: string;
            birthdate: string;
        }>
    ) {
        try {
            const response = await fetch(`${apiDomain}/${this.prefix}/user/register/createAccount`, {
                method: "POST",
                cache: "no-store",
                // headers: {
                //     "X-Requested-With": "XMLHttpRequest"
                // },
                body: JSON.stringify(args)
            });

            if (!response.ok) {
                return new ModelError(await response.json());
            }

            const payload = await response.json() as TPayload<any>;

            return true;
        }
        catch (error) {
            console.error(error);
            return User.internalClientError;
        }
    }
}
