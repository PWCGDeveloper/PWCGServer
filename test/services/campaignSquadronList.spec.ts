import { CampaignSquadronListService } from '../../src//services/campaignSquadronList';

describe('Campaign squadron list accessor', function () {

    it('reads a list of squadrons for a campaign', () => {
        let cwd = __dirname;
        console.log(`CWD = ${cwd}`)
        let campaignListService = new CampaignSquadronListService();
        let campaignName = "Eins";
        const squadrons = campaignListService.getCampaignSquadronList(campaignName);
        expect(squadrons.length > 20);
        squadrons.forEach(squadron => {
            expect(squadron !== null);
            expect(squadron !== undefined);
            expect(squadron.name !== undefined);
        });
    });

})