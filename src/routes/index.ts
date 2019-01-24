import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';
import { CampaignListService } from '../services/campaignList';
import { CampaignSquadronListService } from '../services/campaignSquadronList';
import { NewUserService } from '../services/newUserRequest';
import { LoginService } from '../services/loginRequest';
import { NewPilotService } from '../services/newPilotRequest';
import { PilotsForPlayerService } from '../services/pilotsForPlayerService';
import { SquadronMembersService } from '../services/squadronMembersService';
import { RankService } from '../services/ranksForService';
import { PWCGResponse } from '../model/response';
import { DuplicateFileException } from '../utils/duplicateFileException'
import { HumanPilot } from '../model/pilotdata';
import { UserData } from '../model/userdata';

const router = new Router();

router.get('/pwcgServer/campaignList', ctx => 
{
    try {
        const campaignListService = new CampaignListService();
        const campaignList = campaignListService.getCampaignList();
        ctx.status = 202;
        ctx.body = campaignList;
    }
    catch (e) {
        console.log("Error getting campaign list", e);
        buildResponse(ctx, 500, `Error getting campaign list`);
    }
});

router.get('/pwcgServer/squadronList', ctx => 
{
    let campaignName = ctx.query.campaignName;
    try {
        const campaignSquadronListService = new CampaignSquadronListService();
        const squadronList = campaignSquadronListService.getCampaignSquadronList(campaignName);
        ctx.status = 202;
        ctx.body = squadronList;    
    }
    catch (e) {
        console.log(`Error getting campaign squadron list for campaign ${campaignName}`, e);
        buildResponse(ctx, 500, `Error getting campaign squadron list for campaign ${campaignName}`);
    }
});

router.get('/pwcgServer/ranksForService', ctx => 
{
    let serviceId = ctx.query.serviceId;
    console.log(`get ranks for ${serviceId}`);

    try {
        const rankService = new RankService();
        const rankList = rankService.getRanksForService(serviceId);
        console.log(JSON.stringify(rankList));
        ctx.status = 202;
        ctx.body = rankList;
    }
    catch (e) {
        console.log(`Error getting ranks for service ${serviceId}`, e);
        buildResponse(ctx, 500, `Error getting ranks for service ${serviceId}`);
    }
});


router.get('/pwcgServer/pilotsForPlayer', ctx => 
{
    let playerHandle = ctx.query.playerHandle;
    try {
        const pilotsForPlayerService = new PilotsForPlayerService();
        const pilotsForPlayer = pilotsForPlayerService.getPilotsForPlayer(playerHandle);
        ctx.status = 202;
        ctx.body = pilotsForPlayer;    
    }
    catch (e) {
        console.log(`Error getting pilot list for player ${playerHandle}`, e);
        buildResponse(ctx, 500, `Error getting pilot list for player ${playerHandle}`);
    }
});


router.get('/pwcgServer/squadronMembersForPilot', ctx => 
{
    let humanPilot = JSON.parse(ctx.query.humanPilot);
    console.log(JSON.stringify(humanPilot));

    try {
        const squadronMembersService = new SquadronMembersService();
        const squadronMembers = squadronMembersService.getSquadronMembers(humanPilot);
        ctx.status = 202;
        ctx.body = squadronMembers;    
    }
    catch (e) {
        console.log(`Error getting squadron members for ${humanPilot.pilotName}`, e);
        buildResponse(ctx, 500, `Error getting pilot list for player ${humanPilot.pilotName}`);
    }
});



router.post('/pwcgServer/newUserRequest', ctx => 
{
    let newUserRequest = new UserData();
    try {
        newUserRequest = ctx.request.body;
        const newUserService = new NewUserService();
        newUserService.postNewUserRequest(newUserRequest);
        buildResponse(ctx, 202, `New user request submitted for user  ${newUserRequest.username}`);
    }
    catch (e) {
        console.log("Error posting new user request", e);
        if (e instanceof DuplicateFileException) {
            buildResponse(ctx, 409, `Duplicate user request for user ${newUserRequest.username}`);
        }
        else {
            buildResponse(ctx, 500, `Error posting new user request`);
        }
    }
});

router.post('/pwcgServer/loginRequest', ctx => 
{
    let response = new PWCGResponse();
    try {
        const loginData = ctx.request.body;
        const loginService = new LoginService();
        const isLoginValid = loginService.postLoginRequest(loginData);
        if (isLoginValid) {
            buildResponse(ctx, 202, `Login succeeded for ${loginData.username}`);
        } else {
            buildResponse(ctx, 403, `Login failed for ${loginData.username}`);
        }
    }
    catch (e) {
        console.log("Error during login request", e);
        buildResponse(ctx, 500, `Error during login request`);
    }
});

router.post('/pwcgServer/newPilotRequest', ctx => 
{
    let newPilotRequest = new HumanPilot();
    try {
        console.log(JSON.stringify(ctx.request.body));
        newPilotRequest = ctx.request.body;
        const newPilotService = new NewPilotService();
        newPilotService.postNewPilotRequest(newPilotRequest);
        buildResponse(ctx, 202, `New pilot request submitted for pilot  ${newPilotRequest.pilotName}`);
    }
    catch (e) {
        console.log("Error posting new pilot request", e);
        if (e instanceof DuplicateFileException) {
            buildResponse(ctx, 409, `Duplicate pilot request for pilot ${newPilotRequest.pilotName}`);
        }
        else {
            buildResponse(ctx, 500, `Error posting new user request`);
        }
    }
});

function buildResponse (ctx: any, status: number, message: string) {
    let response = new PWCGResponse();
    response.responseCode = status;
    response.responseMessage = message;

    ctx.response.body = JSON.stringify(response);
    ctx.status = status  
}

export const routes = router.routes();