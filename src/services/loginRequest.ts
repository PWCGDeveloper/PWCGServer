import { LoginData } from '../model/logindata';
import { UserData } from '../model/userdata';
import { FileUtils } from '../utils/fileutils'
import { PWCGServerConfig } from '../utils/config'

export class LoginService {
    public postLoginRequest(loginData: LoginData): boolean {
        let recordedUserData: UserData;

        console.log(loginData);
        let userFile = `${PWCGServerConfig.coopUserDir}/${loginData.username}.json`;
        if (FileUtils.fileExists(userFile)) {
            let fileContent = FileUtils.getFileContents(userFile);
            if (fileContent) {
                recordedUserData = JSON.parse(fileContent);
                if (recordedUserData.username == loginData.username && recordedUserData.password == loginData.password) {
                    if (recordedUserData.approved == true) {
                        console.log(`${loginData.username} has logged in`);
                        return true;
                    } else {
                        console.log(`${loginData.username} has not been approved`);
                    }
                } else {
                    console.log(`${loginData.username} invalid username or password`);
                }
            } else {
                console.log(`${loginData.username} cannot log in because the user file is corrupt`);
            }
        } else {
            console.log(`${loginData.username} cannot log in because no user record exists`);
        }


        return false;
    }
}
