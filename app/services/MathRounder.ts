export class MathRounder {
    public static round(value: number, precision: number): number {
        return Number(Math.round(Number(value + 'e' + precision)) + 'e-' + precision);
    }
}
