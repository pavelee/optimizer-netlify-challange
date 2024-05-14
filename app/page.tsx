import { Uploader } from 'components/Uploader';
import { cookies } from 'next/headers';
import { AssetsService } from './services/AssetsService';
import { Image, Skeleton } from 'antd';
import { AssetGroupDto } from './dto/AssetGroupDto';
import { SummaryContainer } from './container/SummaryContainer';
import { Suspense } from 'react';
import { ContributorsContainer } from './container/ContributorsContainer';

type PageProps = {
    searchParams: {
        g?: string;
    }
}

const Page = async (props: PageProps) => {
    const cookie = cookies();
    const { searchParams } = props;
    const { g } = searchParams;
    const as = new AssetsService();
    let group: AssetGroupDto | undefined;
    if (g) {
        let t = await as.getAssetGroup(g);
        group = await t.toObject();
    }

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <div className='space-y-4'>
                <div className="flex justify-center flex-wrap items-center gap-2 bg-green-600 font-semibold p-5 rounded-xl opacity-85 text-white shadow">
                    {['minify', 'your', '🏞️', 'and', 'save', 'the', '🌍', 'with'].map((word) => (
                        <span key={word}>{word}</span>
                    ))}
                    <Image src={'/netlify-logo.svg'} alt="Netlify logo" />
                </div>
                <Suspense fallback={<Skeleton />}>
                    <SummaryContainer />
                </Suspense>
            </div>
            <Uploader group={group} />
            <div className='space-y-4'>
                <h2 className="text-xl bg-white rounded-xl p-5 opacity-85 border shadow">Contributions 💖</h2>
                <Suspense fallback={<Skeleton />}>
                    <ContributorsContainer />
                </Suspense>
            </div>
        </main>
    );
};

export default Page;
