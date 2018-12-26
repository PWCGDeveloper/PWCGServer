import { Campaign } from '../model/campaign';
import { FileUtils } from '../utils/fileutils'
import { PilotData } from '../model/pilotdata';
import { PWCGServerConfig } from '../utils/config'

export class PilotsForPlayerService {

    public getPilotsForPlayer(playerHandle: string): PilotData[] {
        console.log(`invoked getPilotsForPlayer ${playerHandle}`);

        let pilotsForPlayer = this.getPilotRecordsForPlayer(playerHandle);
        if (pilotsForPlayer === undefined) {
            pilotsForPlayer = [];
        }

        return pilotsForPlayer;
    }

    private getPilotRecordsForPlayer(playerHandle: string): PilotData[] {

        let pilotsForPlayer: PilotData[] = [];
        let coopPilotDir = `${PWCGServerConfig.coopPilotDir}`;

        let pilotFiles = FileUtils.getJsonFiles(coopPilotDir);
        pilotFiles.forEach(function (pilotFile) {
            let fileContent = FileUtils.getFileContents(`${coopPilotDir}/${pilotFile}`);
            if (fileContent) {
                let pilotData = JSON.parse(fileContent);
                if (pilotData.username === playerHandle) {
                    pilotsForPlayer.push(pilotData);
                }
            }
        });

        if (pilotsForPlayer.length === 0) {
            console.log(`no pilots for player ${playerHandle}`);
        }

        return pilotsForPlayer;
    }
}

