'use client'

import { Station } from "react-stations";
import { User } from "../models";
import { ModelError } from "../models/@ultilities";


export type TState = {
    status: "USER";
    token: string;
    user: User;
} | {
    status: "ANONYMOUS";
    token: null;
    user: null;
} | {
    status: "INITIALIZING";
    token: undefined;
    user: undefined;
};


// eslint-disable-next-line new-parens
export const authStation = new class extends Station<TState> {

    public readonly tokenKey = "token";

    /**
     * 
     */
    constructor() {
        super();

        this.setState({
            status: "INITIALIZING",
            token: undefined,
            user: undefined
        });

        if (typeof window === "undefined") {
            return;
        }

        window.addEventListener("storage", e => {
            switch (e.key) {
                case this.tokenKey:
                    return this.verify();

                default:
                    break;
            }
        });

        this.verify();
    }

    /**
     * 
     * @returns 
     */
    public async verify() {
        if (typeof window === "undefined") {
            return;
        }

        const localStorageToken = window.localStorage.getItem(this.tokenKey);

        if (!localStorageToken) {
            window.localStorage.removeItem(this.tokenKey);

            return this.setState({
                status: "ANONYMOUS",
                user: null,
                token: null
            });
        }

        try {
            const verifyResult = await User.profile({
                token: localStorageToken
            });

            // VERIFY FAILED
            if (verifyResult instanceof ModelError) {
                window.localStorage.removeItem(this.tokenKey);

                return this.setState({
                    status: "ANONYMOUS",
                    user: null,
                    token: null
                });
            }

            // Verify call and token verify success
            return this.setState({
                status: "USER",
                user: verifyResult,
                token: localStorageToken
            });
        }
        catch (error) {
            window.localStorage.removeItem(this.tokenKey);

            // Verify call when token doesn't exists
            return this.setState({
                status: "ANONYMOUS",
                user: null,
                token: null
            });
        }
    }

    /**
     * 
     * @param args 
     * @returns 
     */
    public async register(
        args: Parameters<typeof User.register>[0]
    ) {
        if (this.$state.status === "USER") {
            return false;
        }

        return User.register(args);
    }

    /**
     * 
     * @returns 
     */
    public async login(
        args: Parameters<typeof User.login>[0]
    ) {
        if (this.$state.status === "INITIALIZING" || this.$state.status === "USER") {
            return false;
        }

        try {
            this.setState({
                status: "INITIALIZING",
                token: undefined,
                user: undefined
            });

            const signInResult = await User.login(args);

            if (signInResult instanceof ModelError) {
                window.localStorage.removeItem(this.tokenKey);

                this.setState({
                    status: "ANONYMOUS",
                    user: null,
                    token: null
                });

                return signInResult;
            }

            window.localStorage.setItem(this.tokenKey, signInResult.accessToken);

            const userProfile = await User.profile({
                token: signInResult.accessToken
            });

            // VERIFY FAILED
            if (userProfile instanceof ModelError) {
                window.localStorage.removeItem(this.tokenKey);

                return this.setState({
                    status: "ANONYMOUS",
                    user: null,
                    token: null
                });
            }

            return this.setState({
                status: "USER",
                user: userProfile,
                token: signInResult.accessToken
            });
        }
        catch (error) {
            window.localStorage.removeItem(this.tokenKey);

            this.setState({
                status: "ANONYMOUS",
                user: null,
                token: null
            });
        }
    }

    /**
     * 
     * @returns 
     */
    public async signout() {
        const {
            status,
            user,
            token
        } = this.state;

        if (status !== "USER" || !user || !token) {
            return false;
        }

        try {
            await User.logout({
                token: token
            });

            window.localStorage.removeItem(this.tokenKey);

            return this.setState({
                status: "ANONYMOUS",
                user: null,
                token: null
            });
        }
        catch (error) {
            window.localStorage.removeItem(this.tokenKey);

            return Error("Something wrong!");
        }
    }

    /**
     * 
     * @param args 
     */
    public async googleAuthenticate(
        args: Required<{
            credential: string;
        }>
    ) {
        try {
            window.location.href = "https://api.rancher.io.vn/api/v1/auth/google/login";
        }
        catch (error) {
            window.localStorage.removeItem(this.tokenKey);

            this.setState({
                status: "ANONYMOUS",
                user: null,
                token: null
            });
        }
    }

}

export default authStation;
