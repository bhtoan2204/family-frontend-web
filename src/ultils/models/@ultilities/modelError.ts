export class ModelError {

    public readonly httpCode: number;
    public readonly message: string;
    public readonly data: {
        [key: string]: {
            code: string | number;
            message: string;
        }[];
    };

    /**
     * 
     * @param data 
     */
    constructor(
        data: {
            httpCode: number;
            message: string;
            data: {
                [key: string]: {
                    code: string | number;
                    message: string;
                }[];
            };
        }
    ) {
        const { httpCode, message, data: errors } = data;

        this.httpCode = httpCode;
        this.data = errors;
        this.message = message;
    }

}
