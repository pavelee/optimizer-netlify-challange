import { cookies } from 'next/headers';
import { Image } from 'antd';
import { SummaryContainer } from './container/SummaryContainer';
import { Suspense } from 'react';
import { ContributorsContainer } from './container/ContributorsContainer';
import { UploaderContainer } from './container/UploaderContainer';
import { Skeleton } from 'components/Skeleton';

type PageProps = {
    searchParams: {
        g?: string;
    }
}

const Page = async (props: PageProps) => {
    const cookie = cookies();
    const { searchParams } = props;
    const { g } = searchParams;

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <div className='space-y-4'>
                <div className="flex justify-center flex-wrap items-center gap-2 bg-green-600 font-semibold p-5 rounded-xl opacity-85 text-white shadow">
                    {['minify', 'your', '🏞️', 'and', 'save', 'the', '🌍', 'with'].map((word) => (
                        <span key={word}>{word}</span>
                    ))}
                    <Image src={'/netlify-logo.svg'} alt="Netlify logo" />
                </div>
                {/* <Suspense fallback={<Skeleton />}>
                    <SummaryContainer />
                </Suspense> */}
            </div>
            <Suspense fallback={<Skeleton />}>
                <UploaderContainer g={g} />
            </Suspense>
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
