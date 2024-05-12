import { CARBON_UNIT } from 'app/_config/constants';
import { AssetGroupStore } from 'app/_config/store';
import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetGroupFactory } from 'app/factories/AssetGroupFactory';
import { AssetGroup } from 'app/models/AssetGroup';

export class AssetGroupRepository {
    async findBy(
        query: any,
        order: {
            created?: 'asc' | 'desc';
        },
        limit?: number
    ): Promise<AssetGroup[]> {
        const data = await AssetGroupStore.list();
        const r = await Promise.all(
            data.map(async (asset: AssetGroupDto) => {
                return await AssetGroupFactory.createFromDto(asset);
            })
        );

        if (order.created) {
            r.sort((a, b) => {
                if (order.created === 'asc') {
                    return a.getCreated().getTime() - b.getCreated().getTime();
                } else {
                    return b.getCreated().getTime() - a.getCreated().getTime();
                }
            });
        }

        if (limit) {
            return r.slice(0, limit);
        }

        return r;
    }

    async findByDto(query: any, order: { created?: 'asc' | 'desc' }, limit?: number): Promise<AssetGroupDto[]> {
        const data = await AssetGroupStore.list();
        if (order.created) {
            data.sort((a, b) => {
                if (order.created === 'asc') {
                    return new Date(a.created).getTime() - new Date(b.created).getTime();
                } else {
                    return new Date(b.created).getTime() - new Date(a.created).getTime();
                }
            });
        }

        const r = await Promise.all(
            data.map(async (asset: AssetGroupDto) => {
                return await AssetGroupFactory.createFromDto(asset).then((a) => a.toObject());
            })
        );

        if (limit) {
            return r.slice(0, limit);
        }

        return r;
    }

    async summarizeReduction(): Promise<{
        smartReduction: number;
        smartReductionUnit: string;
        reductionInCarbon: number;
        reductionInCarbonUnit: string;
    }> {
        const data = await AssetGroupStore.list();
        const assetGroups = await Promise.all(
            data.map(async (asset: AssetGroupDto) => {
                return await AssetGroupFactory.createFromDto(asset);
            })
        );

        let bestUnit = 'KB';
        const smartReduction = assetGroups.reduce((acc, assetGroup) => {
            const { value, unit } = assetGroup.getSmartReductionInBestUnit();
            bestUnit = unit;
            return acc + value;
        }, 0);

        const reductionInCarbon = assetGroups.reduce((acc, assetGroup) => {
            return acc + assetGroup.getReductionInCarbon();
        }, 0);
        const carbonUnit = CARBON_UNIT;

        return { smartReduction, smartReductionUnit: bestUnit, reductionInCarbon, reductionInCarbonUnit: carbonUnit };
    }
}
