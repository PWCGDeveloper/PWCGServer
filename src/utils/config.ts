export class PWCGServerConfig {
    static pwcgRootDir = '../../workspacePWCGGradle/PWCGCampaign';
    static campaignRoot = `${PWCGServerConfig.pwcgRootDir}/Campaigns`;
    static dataRoot = `${PWCGServerConfig.pwcgRootDir}/BoSData`;
    static coopRoot = `${PWCGServerConfig.pwcgRootDir}/Coop`;
    static inputRoot = `${PWCGServerConfig.dataRoot}/input`;
    static coopUserDir = `${PWCGServerConfig.coopRoot}/Users`;
    static coopPilotDir = `${PWCGServerConfig.coopRoot}/Pilots`;
}