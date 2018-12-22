"use strict";
const mailgunApiKey = process.env.MAILGUN-API-KEY;
const domain = 'mailer.dreamwork.today';
const destination = 'wgd@email.com'
var Mailgun = require('mailgun-js');

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
        var mailgun = new Mailgun({apiKey: mailgunApiKey, domain: domain});
        var data = {
            //Specify email data
            from: email,
            to: destination,
            subject: 'Contact Message from: ' + name,
            text: message
        }
        // Send message:
        mailgun.messages().send(data, function(err, body){
            if(err){
                console.log('Error');
            }
            else{
                console.log('Sent Message');
            }
        });
    }
}

module.exports = Mailer;