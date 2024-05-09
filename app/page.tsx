import { Uploader } from "components/Uploader";
import { cookies } from "next/headers";
import { AssetsService } from "./services/AssetsService";
import { getNetlifyContext } from "utils";

const Page = async () => {
    const cookie = cookies();
    const as = new AssetsService();
    const assets = await as.getAssets();
    const x = getNetlifyContext();
    console.log(x);

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            Optimize your images!
            <Uploader />
            <div className="flex flex-wrap gap-4">
                {assets.map((asset) => (
                    <div key={asset.getOriginalFile().getKey()}>
                        <span>{asset.getOriginalFile().getSize()}</span>
                        <img key={asset.getOriginalFile().getKey()} src={`/api/image/${asset.getOriginalFile().getKey()}`} alt="" className="w-32 h-32 object-cover" />
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Page;
