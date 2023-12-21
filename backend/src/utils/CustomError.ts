export default class CustomError<T> extends Error {
    code: number;

    constructor(name: string, message: T, code: number) {
        super(String(message));
        this.name = name;
        this.code = code;
    }
}
