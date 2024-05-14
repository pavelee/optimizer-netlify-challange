import { CARBON_UNIT } from "app/_config/constants";
import { AssetGroupRepository } from "app/repository/AssetGroupRepository";
import { Summary } from "components/summary";

export const SummaryContainer = async () => {
    const agr = new AssetGroupRepository();
    // TODO: fix it, somehow it's timeout..
    // const summarize = await agr.summarizeReduction();
    const summarize = {
        smartReduction: 21  ,
        smartReductionUnit: 'MB',
        reductionInCarbon: 8,
        reductionInCarbonUnit: CARBON_UNIT
    }

    return (
        <Summary summarize={summarize} />
    );
}