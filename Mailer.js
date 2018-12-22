"use strict";
const mailgunApiKey = process.env.MAILGUN-API-KEY;
const domain = '';
const destination = 'wgd@email.com'

class Mailer{
    constructor(name, email, message){
        this.name = name;
        this.email = email;
        this.message = message;
    }

    get name(){
        return name;
    }
    set name(name){
        this._name = name;
    }

    get email(){
        return email;
    }
    set email(email){
        this._email = email;
    }

    get message(){
        return message;
    }
    set message(message){
        this._message;
    }

    send(){
        var mailgun = new mailgun({apiKey: mailgunApiKey, domain: domain});
        var data = {
            //Specify email data
            from: email,
            to: destination,
            subject: 'Contact Message from: ' + name,
            text: message
        }
    }
}