declare module LeDragon.Framework.Utilities {
    interface Ilogger {
        debugFormat: (message: string) => void;
        infoFormat: (message: string) => void;
        warningFormat: (message: string) => void;
        errorFormat: (message: string) => void;
        fatalFormat: (message: string) => void;
    }
    class logger implements Ilogger {
        private console;
        constructor(console: Console);
        debugFormat(message: string): void;
        infoFormat(message: string): void;
        warningFormat(message: string): void;
        errorFormat(message: string): void;
        fatalFormat(message: string): void;
    }
}
