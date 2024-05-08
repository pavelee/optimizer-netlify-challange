export class Hasher {
    public static hash(): string {
        return Math.random().toString(36).substring(7);
    }
}