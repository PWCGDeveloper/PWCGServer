import { PilotData as PilotData } from '../model/pilotdata';
import { FileUtils } from '../utils/fileutils'
import { PWCGServerConfig } from '../utils/config'

export class NewPilotService 
{
    public postNewPilotRequest(newPilotData: PilotData)
    {
        console.log(newPilotData);
        FileUtils.writeFile(`${PWCGServerConfig.coopPilotDir}/${newPilotData.pilotName}.json`, newPilotData);
    }
}
