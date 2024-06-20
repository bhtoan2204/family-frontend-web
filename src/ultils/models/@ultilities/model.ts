import * as Decorators from "../@decorators";

import { ModelError } from "./modelError";

export type TPaginate<T> = {
    message: string;
    data: T;
    total: number;
}

export type TPayload<T> = Omit<TPaginate<T>, "total">;

export class Model {

    public readonly id!: string;
    public readonly _id!: string;
    public readonly __v!: number;

    public readonly createdAt!: Date | null;
    public readonly updatedAt!: Date | null;

    public static internalClientError = new ModelError({
        httpCode: 409,
        message: "INTERNAL_CLIENT_ERROR",
        data: {
            client: [{
                code: "client.error.0x00001",
                message: "Internal client error."
            }]
        }
    });

    public static readonly humanTimeDiffs = [
        {
            comparator: 60,
            divisor: 1,
            isFullText: true,
            text: "Vừa mới"
        },
        {
            comparator: 60,
            divisor: 60,
            isFullText: false,
            text: "phút trước"
        },
        {
            comparator: 24,
            divisor: 60,
            isFullText: false,
            text: "giờ trước"
        },
        {
            comparator: 30,
            divisor: 24,
            isFullText: false,
            text: "ngày trước"
        },
        {
            comparator: 12,
            divisor: 30,
            isFullText: false,
            text: "tháng trước"
        },
        {
            comparator: -1,
            divisor: 12,
            isFullText: false,
            text: "năm trước"
        }
    ];

    constructor() {
        Decorators.DateTime(this, "createdAt");
        Decorators.DateTime(this, "updatedAt");
    }

    /**
     * Human time diff UI/UX
     * @param dateTime 
     * @returns 
     */
    static humanTimeDiff(
        dateTime: Date | string
    ) {
        const convertedDateTime = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
        const currentDate = new Date();
        const timeMinus = Math.abs(currentDate.getTime() - convertedDateTime.getTime()) / 1000;

        let temporaryNumber = Math.round(timeMinus);

        for (let i = 0; i < Model.humanTimeDiffs.length; i++) {
            const timeDiff = Model.humanTimeDiffs[i];

            if ((i + 1) === Model.humanTimeDiffs.length) {
                return !timeDiff.isFullText ? `${temporaryNumber} ${timeDiff.text}` : timeDiff.text;
            }

            temporaryNumber = Math.round(temporaryNumber / timeDiff.divisor);

            if (temporaryNumber < timeDiff.comparator) {
                return !timeDiff.isFullText ? `${temporaryNumber} ${timeDiff.text}` : timeDiff.text;
            }
        }
    }

    /**
     * Human numeric diff UI/UX
     * @param number 
     * @returns 
     */
    static humanNumericDiff(
        value: number
    ) {
        if (value < 1e3) {
            return `${value}`;
        }
        else if (value < 1e6) {
            return `${this.round(value / 1e3, { numberOfDecimals: 1 })}k`;
        }
        else if (value < 1e9) {
            return `${this.round(value / 1e6, { numberOfDecimals: 1 })}M`;
        }
        else if (value < 1e12) {
            return `${this.round(value / 1e9, { numberOfDecimals: 1 })}G`;
        }
        else {
            return `${this.round(value / 1e12, { numberOfDecimals: 1 })}G`;
        }
    }

    /**
     * Get number with limited number of decimals
     * @param value 
     * @param options 
     * @returns 
     */
    static round(
        value: number,
        options?: Partial<{
            numberOfDecimals: number;
        }>
    ) {
        const divisor = !options?.numberOfDecimals || options.numberOfDecimals < 1 ? 1 : 10 ** options.numberOfDecimals;

        return Math.round((value + Number.EPSILON) * divisor) / divisor;
    }

    /**
     * 
     * @param values 
     * @param value 
     * @returns 
     */
    static includes<T extends string | number>(
        values: readonly T[],
        value: any
    ): value is T {
        return values.includes(value);
    }

}

export const dataInjection = <T extends Model>(
    constructor: new () => T,
    data: any
) => {
    if (data instanceof constructor) {
        return data;
    }

    const instance = new constructor();

    Object.assign(instance, data);

    return instance;
}
