"use strict";
const testKeySecret = process.env.STRIPE_TEST_SECRET_KEY;
const stripe = require("stripe")(testKeySecret); 

class Charge{
    constructor(token, amount){
        this.token = token;
        this.amount = amount;
    }

    get token(){
        return this._token;
    }
    set token(token){
        this._token = token;
    }

    get amount(){
        return this._amount;
    }
    set amount(amount){
        this._amount = amount;
    }

    create(){
        const charge = stripe.charges.create({
            amount: this._amount,
            currency: 'usd',
            description: 'Stripe Checkout Payment',
            source: this._token
        });
    }
}

module.exports = Charge;