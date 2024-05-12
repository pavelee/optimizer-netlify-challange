'use client';

import CountUp from 'react-countup';


type props = {
    summarize: {
        smartReduction: number;
        smartReductionUnit: string;
        reductionInCarbon: number;
        reductionInCarbonUnit: string;
    }
};

const SummaryItem = (props: { value: number, unit: string }) => {
    return (
        <div className='text-3xl'>
            <CountUp start={0} end={props.value} duration={1} /> {props.unit}
        </div>
    )
}

export const Summary = (props: props) => {
    const { summarize } = props;
    return (
        <div className="flex justify-around items-center bg-gradient-to-r from-blue-500 to-purple-500 font-semibold p-5 rounded-xl opacity-85 text-white shadow">
            <h2>Already saved 🥳</h2>
            <SummaryItem value={summarize.smartReduction} unit={summarize.smartReductionUnit} />
            <SummaryItem value={summarize.reductionInCarbon} unit={summarize.reductionInCarbonUnit} />
        </div>
    )
}