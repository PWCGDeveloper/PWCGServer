import { FileUtils } from '../utils/fileutils'
import { HumanPilot } from '../model/pilotdata';
import { SquadronMember } from '../model/squadronmember';
import { PWCGServerConfig } from '../utils/config'

export class SquadronMembersService {

    public getSquadronMembers(humanPilot: HumanPilot): SquadronMember[] {
        console.log(`invoked getSquadronMembersForPilot ${humanPilot.pilotName}`);

        let squadronMembers = this.getSquadronMembersForPilot(humanPilot);
        if (squadronMembers === undefined) {
            squadronMembers = [];
        }

        return squadronMembers;
    }

    getSquadronMembersForPilot(humanPilot: HumanPilot): SquadronMember[] {

        let squadronMembersForHumanPilot: SquadronMember[] = [];
        let squadronPersonnelDir = `${PWCGServerConfig.campaignRoot}/${humanPilot.campaignName}/Personnel`;

        let squadronPersonnelFiles = FileUtils.getJsonFiles(squadronPersonnelDir);
        for (var i = 0, squadronPersonnelFilesLen = squadronPersonnelFiles.length; i < squadronPersonnelFilesLen; i++) {
            let squadronPersonnelFile = squadronPersonnelFiles[i];
            let fileContent = FileUtils.getFileContents(`${squadronPersonnelDir}/${squadronPersonnelFile}`);
            if (fileContent) {

                let squadronMemberFileContents = JSON.parse(fileContent);

                let squadronMembers = new Array<SquadronMember>();
                let squadronPersonnel = squadronMemberFileContents.squadronMemberCollection;
                console.log(JSON.stringify(squadronPersonnel));
                for(let key in squadronPersonnel) {
                    console.log(key);
                    if (squadronPersonnel.hasOwnProperty(key)) {
                        let squadronMember = squadronPersonnel[key] as SquadronMember;
                        squadronMembers.push(squadronMember);
                    }
                }

                console.log(JSON.stringify(squadronMembers[0]));
                if (squadronMembers[0].squadronId == humanPilot.squadronId) {
                    return squadronMembers;
                }
            }
        }

        if (squadronMembersForHumanPilot.length === 0) {
            console.log(`no pilots for player ${humanPilot.serialNumber}`);
        }

        return squadronMembersForHumanPilot;
    }

    getCorrectSquadronForPilot() {

    }
}

