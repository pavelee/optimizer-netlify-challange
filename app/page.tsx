import { Uploader } from 'components/Uploader';
import { cookies } from 'next/headers';
import { AssetsService } from './services/AssetsService';
import { AssetDTO } from './models/Asset';
import { Carousel, Image, Progress } from 'antd';
import { AssetRepository } from './repository/AssetRepository';
import { AssetGroupDto } from './dto/AssetGroupDto';

type props = {
    asset: AssetDTO;
};

const AssetItem = (props: props) => {
    return (
        <Carousel arrows infinite={true} autoplay={true}>
            <div className="flex gap-4 border border-white relative w-[100%] h-[100%]">
                <div
                    className="
                    absolute p-5 rounded-xl border bg-white z-50
                    flex flex-col gap-2 justify-center items-center
                "
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                >
                    <Progress
                        type="dashboard"
                        percent={props.asset.optimizationPercent}
                        size={80}
                        strokeColor="green"
                    />
                    <span>{props.asset.reductionInKb} kB</span>
                    <span>{props.asset.reductionInCarbon} co2</span>
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
                    <Image
                        src={`/api/image/${props.asset.optimizedFile.key}`}
                        alt=""
                        className="w-32 h-32 object-cover"
                    />
                    {/* <a href={`/api/image/${props.asset.optimizedFile.key}/download`}>download</a> */}
                </div>
            </div>
        </Carousel>
    );
};

type PageProps = {
    searchParams: {
        g?: string;
    }
}

const Page = async (props: PageProps) => {
    const { searchParams } = props;
    const { g } = searchParams;
    const cookie = cookies();
    const ar = new AssetRepository();
    const as = new AssetsService();
    const assets = await ar.findBy({}, { created: 'desc' });
    let group: AssetGroupDto | undefined;
    if (g) {
        let t = await as.getAssetGroup(g);
        group = await t.toObject();
    }

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <div className="flex justify-center items-center gap-4 bg-green-600 font-semibold p-5 rounded-xl opacity-85 text-white">
                Save the 🌍 with <Image src={'/netlify-logo.svg'} alt="Netlify logo" />
            </div>
            <Uploader group={group} />
            <div className="grid  md:grid-cols-2 gap-4">
                {assets.map((asset) => (
                    <AssetItem key={asset.getId()} asset={asset.toObject()} />
                ))}
            </div>
        </main>
    );
};

export default Page;
