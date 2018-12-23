import { UserData } from '../model/userdata';
import { FileUtils } from '../utils/fileutils'
import { PWCGServerConfig } from '../utils/config'

export class NewUserService 
{
    public postNewUserRequest(newUserData: UserData)
    {
        console.log(newUserData);
        FileUtils.writeFile(`${PWCGServerConfig.coopUserDir}/${newUserData.username}.json`, newUserData);
    }
}
