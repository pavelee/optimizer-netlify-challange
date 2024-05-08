import { Uploader } from "components/Uploader";
import { getImages } from "./actions/getImages";
import { getImage } from "./actions/getImage";
import Image from "next/image";
import { cookies } from "next/headers";
import { BlobStore, JsonStore } from "./ _config/store";

const Page = async () => {
    const cookie = cookies();
    const images = await BlobStore.list();

    const data = await JsonStore.list();
    console.log(data);
    await JsonStore.save('data', { test: 'test' });

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            Optimize your images!
            <Uploader />
            <div className="flex flex-wrap gap-4">
                {images.map((image) => (
                    <img key={image} src={`/api/image/${image}`} alt="" className="w-32 h-32 object-cover" />
                ))}
            </div>
        </main>
    );
}

export default Page;
