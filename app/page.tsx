import { Uploader } from "components/Uploader";
import { getImages } from "./actions/getImages";
import { getImage } from "./actions/getImage";
import Image from "next/image";
import { cookies } from "next/headers";

const Page = async () => {
    const cookie = cookies();
    const images = await getImages();
    const image = await getImage('8mtsvc');

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            Optimize your images!
            <Uploader />
            <Image src="/api/image/8mtsvc" width={512} height={512} alt={'asd'} />
            <Image src="/api/image/8mtsvc/optimize" width={512} height={512} alt={'asd'} />
            <div className="flex flex-wrap gap-4">
                {images.map((image) => (
                    <img key={image} src={image} alt="" className="w-32 h-32 object-cover" />
                ))}
            </div>
        </main>
    );
}

export default Page;
