import { AssetDTO } from 'app/models/Asset';
import { SmartReduction } from 'app/models/AssetGroup';

export type AssetGroupDto = {
    id: string;
    assets: AssetDTO[];
    smartSize?: SmartReduction;
    smartReduction?: SmartReduction;
    reductionInB?: number;
    reductionInKb?: number;
    reductionInMb?: number;
    reductionInCarbon?: number;
    sizeInB?: number;
    sizeInKb?: number;
    sizeInMb?: number;
    created: Date;
};
