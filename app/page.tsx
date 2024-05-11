import { Uploader } from 'components/Uploader';
import { cookies } from 'next/headers';
import { AssetsService } from './services/AssetsService';
import { AssetDTO } from './models/Asset';
import { Image, Progress } from 'antd';

type props = {
    asset: AssetDTO;
};

const AssetItem = (props: props) => {
    return (
        <div className="flex gap-4 border border-white relative">
            <div className='absolute p-5 rounded-xl border bg-white z-50' style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <Progress type="dashboard" percent={props.asset.optimizationPercent} size={80} strokeColor="green" />
            </div>
            {/* <div>
                <span>
                    {props.asset.originalFile.sizeInKB} {props.asset.originalFile.extension}
                </span>
                <Image src={`/api/image/${props.asset.originalFile.key}`} alt="" className="w-32 h-32 object-cover" />
                <a href={`/api/image/${props.asset.originalFile.key}/download`}>download</a>
            </div> */}
            <div>
                {/* <span>
                    {props.asset.optimizedFile.sizeInKB} {props.asset.optimizedFile.extension}
                </span> */}
                <Image src={`/api/image/${props.asset.optimizedFile.key}`} alt="" className="w-32 h-32 object-cover" />
                <a href={`/api/image/${props.asset.optimizedFile.key}/download`}>download</a>
            </div>
        </div>
    );
};

const Page = async () => {
    const cookie = cookies();
    const as = new AssetsService();
    const assets = await as.getAssets();

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
};

export default Page;
