import { Card } from "antd";
import { CARBON_UNIT } from "app/_config/constants";
import { AssetGroupDto } from "app/dto/AssetGroupDto";
import { Unit } from "app/models/AssetGroup";
import { AssetGroupRepository } from "app/repository/AssetGroupRepository";
import { formatDistanceToNow } from "date-fns";

type props = {
    group: {
        id: string;
        created: string;
        smartReduction: {
            value: number;
            unit: Unit;
        };
        reductionInCarbon: number;
        assets: any[];
    };
};

const AssetItem = (props: props) => {
    const { group } = props;

    return (
        <Card>
            <div className="space-y-5">
                <div className='text-small text-gray-400'>{formatDistanceToNow(new Date(group.created))}</div>
                <div>
                    someone reduced <strong>{group.smartReduction.value} {group.smartReduction.unit}</strong> and <strong>{group.reductionInCarbon} {CARBON_UNIT}</strong>
                </div>
            </div>
        </Card>
    );
};

export const ContributorsContainer = async () => {
    const agr = new AssetGroupRepository();
    // const groups = await agr.findByDto({}, { created: 'desc' }, 5);
    const groups = [
        {
            id: '1',
            created: '2024-04-01T00:00:00.000Z',
            smartReduction: {
                value: 20,
                unit: 'MB' as Unit
            },
            reductionInCarbon: 20,
            assets: [],
        },
        {
            id: '2',
            created: '2021-09-01T00:00:00.000Z',
            smartReduction: {
                value: 20,
                unit: 'MB' as Unit
            },
            reductionInCarbon: 20,
            assets: [],
        },
        {
            id: '3',
            created: '2021-09-01T00:00:00.000Z',
            smartReduction: {
                value: 20,
                unit: 'MB' as Unit
            },
            reductionInCarbon: 20,
            assets: [],
        },
        {
            id: '4',
            created: '2021-09-01T00:00:00.000Z',
            smartReduction: {
                value: 20,
                unit: 'MB' as Unit
            },
            reductionInCarbon: 20,
            assets: [],
        },
        {
            id: '5',
            created: '2021-09-01T00:00:00.000Z',
            smartReduction: {
                value: 20,
                unit: 'MB' as Unit
            },
            reductionInCarbon: 20,
            assets: [],
        },
    ];

    return (
        <div className="grid  md:grid-cols-4 gap-4">
            {groups.map((group) => (
                <AssetItem key={group.id} group={group} />
            ))}
        </div>
    )
}