import { Card } from "antd";
import { CARBON_UNIT } from "app/_config/constants";
import { AssetGroupDto } from "app/dto/AssetGroupDto";
import { AssetGroupRepository } from "app/repository/AssetGroupRepository";
import { formatDistanceToNow } from "date-fns";

type props = {
    group: AssetGroupDto;
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
    const groups = await agr.findByDto({}, { created: 'desc' }, 5);

    return (
        <div className="grid  md:grid-cols-4 gap-4">
            {groups.map((group) => (
                <AssetItem key={group.id} group={group} />
            ))}
        </div>
    )
}