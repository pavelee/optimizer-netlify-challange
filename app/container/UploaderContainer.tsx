import { AssetGroupDto } from "app/dto/AssetGroupDto";
import { AssetsService } from "app/services/AssetsService";
import { Uploader } from "components/Uploader";

type props = {
    g?: string;
};

export const UploaderContainer = async (props: props) => {
    const { g } = props;
    const as = new AssetsService();
    let group: AssetGroupDto | undefined;
    if (g) {
        let t = await as.getAssetGroup(g);
        group = await t.toObject();
    }

    return <Uploader group={group} />
}