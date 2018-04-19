import { Component } from '@angular/core';
import { Service } from '../../services/service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './bankbot.html'
})
export class Bankbot {

    private message: string = "";
    private annoyanceCounter: number = 1;
    private lastMessage: string = "";
    private annoyanceBurst: number = 3;
    private messages: Message[] = [];

    constructor(
        private service: Service,
        private route: ActivatedRoute
    ) { }

    ngOnInit(){
        this.insertMessage("bot", "Hej, du snakker med Banky Bot");
    }

    private sendMessage(){
        if(this.message == "") {
            return;
        }
        this.service.fetchBotIntent(this.message).then(
            data => {
                this.insertMessage("self", this.message);
                this.message = "";
                let response = this.handleBotResponse(data);
                this.insertMessage("bot", response);
            }
        )
    }

    private insertMessage(sender, message){
        this.messages.push(new Message(sender, message));  
    }

    private handleBotResponse(response){
        let limit = 0.7;
        let intent = null;
        response.forEach(element => {
            if(element.value > limit){
                limit = element.value;
                intent = element.label;
            }
        });
        console.log(response);
        let intentMsg;
        if (intent == this.lastMessage) {
            this.annoyanceCounter++;
            console.log(intent + " igen!! " + this.annoyanceCounter)
            if(this.annoyanceCounter >= this.annoyanceBurst){
                return "Hvad vil du mig?!";
            }
        } else {
            console.log("New message " + intent)
            this.lastMessage = intent;
            this.annoyanceCounter = 1;
        }
        switch(intent){
            case "Budgetkonto":
                intentMsg = "Klassificeret: Budgetkonto";
                break;
            case "Overblik":
                intentMsg = "Klassificeret: Overblik";
                break;
            case "Hilsen":
                intentMsg = this.welcomeMessage();
                break;
            default:
                intentMsg = "Den besked forstod jeg desværre ikke.";
                break;
        }
        return intentMsg;
    }

    private welcomeMessage(){
        let responseList = [];
        responseList.push("Hej med dig, hvad leder du efter?");
        responseList.push("Hej, hvordan kan jeg hjælpe?");
        responseList.push("Øh hejsa du.");
        responseList.push("Hej, hvad leder du efter?")
        let idx = Math.floor(Math.random() * responseList.length);
        return responseList[idx];
    }
}

class Message{
    private sender: string;
    private message: string;
    constructor(sender: string, message: string){
        this.sender = sender;
        this.message = message;
    }
}