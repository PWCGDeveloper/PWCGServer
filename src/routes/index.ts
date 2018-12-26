import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';
import { CampaignListService } from '../services/campaignList';
import { CampaignSquadronListService } from '../services/campaignSquadronList';
import { NewUserService } from '../services/newUserRequest';
import { LoginService } from '../services/loginRequest';
import { NewPilotService } from '../services/newPilotRequest';
import { PilotsForPlayerService } from '../services/pilotsForPlayerService';
import { PWCGResponse } from '../model/response';

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

router.post('/pwcgServer/newUserRequest', ctx => 
{
    let response = new PWCGResponse();
    try {
        const newUserRequest = ctx.request.body;
        const newUserService = new NewUserService();
        newUserService.postNewUserRequest(newUserRequest);
        buildResponse(ctx, 202, `New user request submitted for pilot  ${newUserRequest.username}`);
    }
    catch (e) {
        console.log("Error posting new user request", e);
        buildResponse(ctx, 500, `Error posting new user request`);
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
    let response = new PWCGResponse();
    try {
        const newPilotRequest = ctx.request.body;
        const newPilotService = new NewPilotService();
        newPilotService.postNewPilotRequest(newPilotRequest);
        buildResponse(ctx, 202, `New pilot request submitted for pilot  ${newPilotRequest.pilotName}`);
    }
    catch (e) {
        console.log("Error posting new pilot request", e);
        buildResponse(ctx, 500, `New pilot request failed`);
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