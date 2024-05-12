import { AssetDTO } from 'app/models/Asset';
import { SmartReduction } from 'app/models/AssetGroup';

export type AssetGroupDto = {
    id: string;
    assets: AssetDTO[];
    smartReduction?: SmartReduction;
    reductionInB?: number;
    reductionInKb?: number;
    reductionInMb?: number;
    reductionInCarbon?: number;
    created: Date;
};
