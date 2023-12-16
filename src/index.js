import express from "express";
import twilio from "twilio";
import { config } from "dotenv";
import path from "path";

const app = express();
app.use(express.json());

config();

const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSID, authToken);

app.post('/send', (request, response) => {
    const { to } = request.body;

    client.messages.create({
        body: "Hi Doll, This Message is from Teddy :)",
        to,
        from: twilioPhoneNumber,
    })
        .then((res) => response.status(200).send({ message: "SMS sent Successfully", response: res }))
        .catch((err) => response.status(500).send({ message: "Something went Wrong", error: err }))
})

app.listen(4000, () => console.log("App is listening in Port 4000"))