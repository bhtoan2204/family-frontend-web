import * as Ultils from "../@ultilities";

/**
 * Auto convert string to datetime
 * @returns 
 */
export const DateTime = (
    target: Ultils.Model,
    propertyKey: string
) => {
    let tmpValue: Date | null | undefined = undefined;

    Object.defineProperty(target, propertyKey, {
        get: () => {
            return tmpValue;
        },
        set: (newValue: any) => {
            try {
                tmpValue = typeof newValue !== "string" ? !(newValue instanceof Date) ? null : newValue : new Date(newValue);
            }
            catch (error) {
                console.error(error);
                tmpValue = undefined;
            }
        }
    });
}

/**
 * 
 * @param target 
 * @param propertyKey 
 * @param initializer 
 */
export function InstanceOf<T extends Ultils.Model>(
    target: Ultils.Model,
    propertyKey: string,
    initializer: new () => T
) {
    let tmpValue: T | null | undefined = undefined;

    Object.defineProperty(target, propertyKey, {
        get: () => {
            return tmpValue;
        },
        set: (newData: any) => {
            try {
                if (newData === undefined || typeof newData !== "object") {
                    tmpValue = undefined;
                    return;
                }

                if (newData === null || newData instanceof initializer) {
                    tmpValue = newData;
                    return;
                }

                tmpValue = Ultils.dataInjection(initializer, newData);
            }
            catch (error) {
                console.error(error);
                tmpValue = undefined;
            }
        }
    });
}


/**
 * 
 * @param target 
 * @param propertyKey 
 * @param initializer 
 * @returns 
 */
export function ArrayOf<T extends Ultils.Model>(
    target: Ultils.Model,
    propertyKey: string,
    initializer: new () => T
) {
    let tmpValue: T[] | undefined = undefined;

    Object.defineProperty(target, propertyKey, {
        get: function () {
            return tmpValue;
        },
        set: function (newDatas: any) {
            try {
                if (!Array.isArray(newDatas)) {
                    tmpValue = undefined;
                    return;
                }

                tmpValue = newDatas.map(newData => {
                    if (newData instanceof initializer) {
                        return newData;
                    }

                    return Ultils.dataInjection(initializer, newData);
                });
            }
            catch (error) {
                console.error(error);
                tmpValue = undefined;
            }
        }
    });
}
