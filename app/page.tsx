import { Uploader } from "components/Uploader";
import { cookies } from "next/headers";
import { AssetsService } from "./services/AssetsService";

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
                    <div key={asset.getOptimizedFile().getKey()}>
                        <span>{asset.getOptimizedFile().getSize()}</span>
                        <img key={asset.getOptimizedFile().getKey()} src={`/api/image/${asset.getOptimizedFile().getKey()}`} alt="" className="w-32 h-32 object-cover" />
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Page;
