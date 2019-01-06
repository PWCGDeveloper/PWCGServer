import { FileUtils } from '../utils/fileutils'
import { Rank } from '../model/rank';
import { PWCGServerConfig } from '../utils/config'

export interface IRanks {
    [serviceId: number]: Rank[];
}

export class RankService {
    static squadronsByCampaign: IRanks = {};

    public getRanksForService(serviceId: number): Rank[] {
        let ranksForService: Rank[] = [];
        let ranks = this.getRanks();
        ranks.forEach(rank => {
            if (rank.rankService == serviceId) {
                ranksForService.push(rank);
            }
        });

        return ranksForService;
    }

    private getRanks(): Rank[] {

        let ranks: Rank[] = [];
        let rankDir = `${PWCGServerConfig.inputRoot}/Ranks`;

        let fileContent = FileUtils.getFileContents(`${rankDir}/Ranks.json`);
        if (fileContent) {
            let rankFileContent = JSON.parse(fileContent);
            ranks = rankFileContent.ranks;
        } else {
            console.log(`no rank data in ${rankDir}/Ranks.json`);
        }
        return ranks;
    }
}

