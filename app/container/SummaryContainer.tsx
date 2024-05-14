import { AssetGroupRepository } from "app/repository/AssetGroupRepository";
import { Summary } from "components/summary";

export const SummaryContainer = async () => {
    const agr = new AssetGroupRepository();
    const summarize = await agr.summarizeReduction();

    return (
        <Summary summarize={summarize} />
    );
}