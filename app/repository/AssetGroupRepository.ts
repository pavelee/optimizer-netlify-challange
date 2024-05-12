import { AssetGroupStore } from 'app/_config/store';
import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetGroupFactory } from 'app/factories/AssetGroupFactory';
import { AssetGroup } from 'app/models/AssetGroup';

export class AssetGroupRepository {
    async findBy(
        query: any,
        order: {
            created?: 'asc' | 'desc';
        }
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

        return r;
    }

    async findByDto(query: any, order: { created?: 'asc' | 'desc' }): Promise<AssetGroupDto[]> {
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

        return r;
    }
}
