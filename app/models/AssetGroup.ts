import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { Asset } from './Asset';

export class AssetGroup {
    constructor(private id: string, private created: Date, private assets: Asset[] = []) {}

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

    public getReductionInCarbon(): number {
        return this.assets.reduce((acc, asset) => acc + asset.getReductionInCarbon(), 0);
    }

    public toObject(): AssetGroupDto {
        return {
            id: this.id,
            assets: this.assets.map((asset) => asset.toObject()),
            reductionInCarbon: this.getReductionInCarbon(),
            created: this.created
        };
    }
}
