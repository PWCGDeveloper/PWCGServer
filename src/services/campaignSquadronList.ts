import { Campaign } from '../model/campaign';
import { FileUtils } from '../utils/fileutils'
import { Squadron } from '../model/squadron';
import { PWCGServerConfig } from '../utils/config'

export interface ISquadrons {
    [campaignName: string]: Squadron[];
}

export class CampaignSquadronListService {
    static squadronsByCampaign: ISquadrons = {};

    public getCampaignSquadronList(campaignName: string): Squadron[] {
        this.loadSquadronsForCampaign(campaignName);
        let campaignSquadrons = CampaignSquadronListService.squadronsByCampaign[campaignName];
        if (campaignSquadrons === undefined) {
            campaignSquadrons = [];
        }

        return campaignSquadrons;
    }

    private loadSquadronsForCampaign(campaignName: string) {
        if (CampaignSquadronListService.squadronsByCampaign[campaignName] === undefined) {
            let campaignSquadrons: Squadron[] = [];
            campaignSquadrons = this.getSquadronsForCampaign(campaignName);
            if (campaignSquadrons !== undefined) {
                CampaignSquadronListService.squadronsByCampaign[campaignName] = campaignSquadrons;
            }
        }
    }

    private getSquadronsForCampaign(campaignName: string): Squadron[] {

        let campaignSquadrons: Squadron[] = [];
        let squadronDataDir = `${PWCGServerConfig.inputRoot}/Squadron`;

        let squadronFiles = FileUtils.getJsonFiles(squadronDataDir);
        squadronFiles.forEach(function (squadronFile) {
            let fileContent = FileUtils.getFileContents(`${squadronDataDir}/${squadronFile}`);
            if (fileContent) {
                let squadron = JSON.parse(fileContent);
                campaignSquadrons.push(squadron);
            } else {
                console.log(`no squadron data in ${squadronDataDir}/${squadronFile}`);
            }

        });

        return campaignSquadrons;
    }
}

