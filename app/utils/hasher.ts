export class UniqueHashGenerator {
    public static generateHash(): string {
        return Math.random().toString(36).substring(7);
    }
}