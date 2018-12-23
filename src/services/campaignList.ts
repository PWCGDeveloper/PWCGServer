import { Campaign } from '../model/campaign';
import { FileUtils } from '../utils/fileutils'
import { PWCGServerConfig } from '../utils/config'

export class CampaignListService 
{
    public getCampaignList() : Campaign[]
    {
        let campaignList: Campaign[] = [];

        const campaignDirs = FileUtils.getSubDirectories(PWCGServerConfig.campaignRoot);
        campaignDirs.forEach(function (campaignDir) {
            let campaignPath = `${PWCGServerConfig.campaignRoot}/${campaignDir}/Campaign.json`;
            let fileContent = FileUtils.getFileContents(campaignPath);
            console.log(`for path ${campaignDir}`);
            if (fileContent) {
                let campaign = JSON.parse(fileContent);
                campaignList.push(campaign);
                console.log(`${campaign}`);
            } else {
                console.log(`no campaign in ${campaignDir}`);
            }
        });

        return campaignList;
    }
}

