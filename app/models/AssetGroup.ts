import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { Asset } from './Asset';
import { MathRounder } from 'app/services/MathRounder';

export type Unit = 'KB' | 'MB' | 'B';

export type SmartReduction = {
    value: number;
    unit: Unit;
};

export class AssetGroup {
    constructor(private id: string, private created: Date, private assets: Asset[] = []) {}

    private round(value: number, decimals: number) {
        return MathRounder.round(value, decimals);
    }

    public getId(): string {
        return this.id;
    }

    public getCreated(): Date {
        return this.created;
    }

    public add(asset: Asset): void {
        this.assets.push(asset);
    }

    public remove(asset: Asset): void {
        this.assets = this.assets.filter((a) => a !== asset);
    }

    public getAssets(): Asset[] {
        return this.assets;
    }

    public getReductionIn(unit: 'KB' | 'MB' | 'B' = 'KB'): number {
        return this.round(
            this.assets.reduce((acc, asset) => acc + asset.getSizeReductionIn(unit), 0),
            2
        );
    }

    public getReductionInCarbon(): number {
        return this.round(
            this.assets.reduce((acc, asset) => acc + asset.getReductionInCarbon(), 0),
            2
        );
    }

    public getSizeIn(unit: 'KB' | 'MB' | 'B' = 'KB'): number {
        return this.round(this.assets.reduce((acc, asset) => {
            if (!asset.getOptimizedFile()) {
                return acc + asset.getOriginalFile().getSizeIn(unit);
            };
            return acc + asset.getOptimizedFile().getSizeIn(unit);
        }, 0), 2);
    }

    public getSmartSizeInBestUnit(): SmartReduction {
        const sizeInKb = this.getSizeIn('KB');
        if (sizeInKb > 1024) {
            return { value: this.getSizeIn('MB'), unit: 'MB' };
        }
        return { value: sizeInKb, unit: 'KB' };
    }

    public getSmartReductionInBestUnit(): SmartReduction {
        const reductionInKb = this.getReductionIn('KB');
        if (reductionInKb > 1024) {
            return { value: this.getReductionIn('MB'), unit: 'MB' };
        }
        return { value: reductionInKb, unit: 'KB' };
    }

    public toObject(): AssetGroupDto {
        return {
            id: this.id,
            assets: this.assets.map((asset) => asset.toObject()),
            smartSize: this.getSmartSizeInBestUnit(),
            smartReduction: this.getSmartReductionInBestUnit(),
            reductionInB: this.getReductionIn('B'),
            reductionInKb: this.getReductionIn('KB'),
            reductionInMb: this.getReductionIn('MB'),
            reductionInCarbon: this.getReductionInCarbon(),
            sizeInB: this.getSizeIn('B'),
            sizeInKb: this.getSizeIn('KB'),
            sizeInMb: this.getSizeIn('MB'),
            created: this.created
        };
    }
}
