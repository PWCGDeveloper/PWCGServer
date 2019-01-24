import { SquadronMembersService } from '../../src/services/squadronMembersService';
import { HumanPilot } from '../../src/model/pilotdata';

describe('Validate squadron members associated with a human pilot', function () {

    it('reads a list of squadrons for a campaign', () => {
        try {
            let cwd = __dirname;
            console.log(`CWD = ${cwd}`)
            let squadronMemberService = new SquadronMembersService();
            let testPilot = new HumanPilot();
            testPilot.campaignName = 'Coop Test Bed';
            testPilot.approved = true;
            testPilot.squadronId = 10111034;
            testPilot.serialNumber = 1000002;
            const squadronMembers = squadronMemberService.getSquadronMembersForPilot(testPilot);
            expect(squadronMembers.length > 10);
            squadronMembers.forEach( (squadronMember) => {
                expect(squadronMember.squadronId === 10111034 );
            });
            expect(squadronMembers.length < 20);
        }
        catch (e) {
            console.log(e);
        }
    });
})