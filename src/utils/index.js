export * from "./authenticate";
export * from "./history";

export function getNumOrZero(num) {
    if (!num) {
        num = 0
    } else if (typeof num != "number") {
        try {
            num = Number(num);
            num = getNumOrZero(num)
        } catch (e) {
            num = 0
        }
    }

    return num
}