import { HumanPilot as HumanPilot } from '../model/pilotdata';
import { FileUtils } from '../utils/fileutils'
import { PWCGServerConfig } from '../utils/config'

export class NewPilotService 
{
    public postNewPilotRequest(newPilotData: HumanPilot)
    {
        FileUtils.writeFile(PWCGServerConfig.coopPilotDir, `${newPilotData.pilotName}.json`, newPilotData);
    }
}
