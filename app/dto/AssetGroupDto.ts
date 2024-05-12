import { AssetDTO } from 'app/models/Asset';

export type AssetGroupDto = {
    id: string;
    assets: AssetDTO[];
    reductionInCarbon?: number;
    created: Date;
};
