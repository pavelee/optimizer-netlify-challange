import { Uploader } from "components/Uploader";
import { cookies } from "next/headers";
import { AssetsService } from "./services/AssetsService";
import { AssetDTO } from "./models/Asset";

type props = {
    asset: AssetDTO;
}

const AssetItem = (props: props) => {
    return (
        <div className="flex gap-4 border border-white">
            <h3>{props.asset.optimizationPercent}%</h3>
            <div>
                <span>{props.asset.originalFile.sizeInKB} {props.asset.originalFile.extension}</span>
                <img src={`/api/image/${props.asset.originalFile.key}`} alt="" className="w-32 h-32 object-cover" />
                <a href={`/api/image/${props.asset.originalFile.key}/download`}>download</a>
            </div>
            <div>
                <span>{props.asset.optimizedFile.sizeInKB} {props.asset.optimizedFile.extension}</span>
                <img src={`/api/image/${props.asset.optimizedFile.key}`} alt="" className="w-32 h-32 object-cover" />
                <a href={`/api/image/${props.asset.optimizedFile.key}/download`}>download</a>
            </div>
        </div>)
}

const Page = async () => {
    const cookie = cookies();
    const as = new AssetsService();
    const assets = await as.getAssets();
    console.log(assets);

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            Optimize your images!
            <Uploader />
            <div className="flex flex-wrap gap-4">
                {assets.map((asset) => (
                    <AssetItem key={asset.getId()} asset={asset.toObject()} />
                ))}
            </div>
        </main>
    );
}

export default Page;
