import { AssetDTO } from 'app/models/Asset';

export type AssetGroupDto = {
    id: string;
    assets: AssetDTO[];
    reductionInB?: number;
    reductionInKb?: number;
    reductionInMb?: number;
    reductionInCarbon?: number;
    created: Date;
};
