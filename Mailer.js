"use strict";
const mailgunApiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const destination = process.env.DESTINATION_EMAIL;
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
        this._message = message;
    }

    send(){
        var mailgun = new Mailgun({apiKey: mailgunApiKey, domain: domain});
        // Should implement some input validation below...
        var content = this._message + '\n\n' + 'Reply to: ' + this._email;
        var data = {
            // Specify email data
            from: 'noreply@' + domain,
            to: destination,
            subject: 'Contact Message from: ' + this._name,
            text: content
        }
        // Send message:
        mailgun.messages().send(data, function(err, body){
            if(err){
                console.log(err);
            }
            else{
                console.log('Sent Message');
            }
        });
    }
}

module.exports = Mailer;