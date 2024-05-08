import { Uploader } from "components/Uploader";
import { getImages } from "./actions/getImages";
import { getImage } from "./actions/getImage";
import Image from "next/image";
import { cookies } from "next/headers";
import { BlobStore, JsonStore } from "./ _config/store";
import { AssetsService } from "./services/AssetsService";

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
                    <img key={asset.getOriginalFile().getKey()} src={`/api/image/${asset.getOriginalFile().getKey()}`} alt="" className="w-32 h-32 object-cover" />
                ))}
            </div>
        </main>
    );
}

export default Page;
