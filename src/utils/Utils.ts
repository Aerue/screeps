export default class Utils {

    public static isDefined(val: any): boolean {
        if (val === undefined) {
            return false;
        }
        return true;
    }

    public static isUndefined(val: any): boolean {
        if (val === undefined) {
            return true;
        }
        return false;
    }

}
