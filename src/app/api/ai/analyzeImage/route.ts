import {NextRequest, NextResponse} from "next/server";
import {generateObject} from 'ai';
import {createOpenAI} from '@ai-sdk/openai';
import {z} from 'zod';
import {prisma} from "@/lib/db";

const promt = `
    Please generate an object with the data available in the following ticket. 
    if the image provided is not a ticket or does not have the ticket schema information, 
    return a json with a message that says: Por favor toma una foto de un ticket de consulta.
`

const ticketSchema = z.object({
    price: z.string(),
    date: z.string(),
    time: z.string(),
    clinic: z.string(),
    address: z.string(),
    user: z.string(),
    receipt_number: z.string(),
    patient: z.string(),
    hc_number: z.string(),
    service: z.string(),
    quantity: z.string(),
    unit_price: z.string(),
    total_price: z.string(),
    amount_received: z.string(),
    change: z.string(),
    ticket_number: z.string(),
    appointment_date: z.string(),
    appointment_time: z.string()
});

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export async function POST(req: NextRequest) {
    try {
        const {image} = await req.json();
        const {object} = await generateObject({
            mode: 'json',
            model: openai('gpt-4o'),
            maxTokens: 4096,
            schema: ticketSchema,
            messages: [
                {
                    role: 'user',
                    content: promt
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            image
                        }
                    ]
                }
            ]
        });

        // let totalPrice = '';
        //
        //
        // if (object.total_price.includes(',')) {
        //     console.log(object.total_price)
        //     const numbersInString = object.total_price.split(',');
        //     const sum = numbersInString
        //         .map((str) => parseFloat(str)) // Convert strings to numbers
        //         .reduce((acc, value) => acc + value, 0); // Sum the numbers
        //
        //     totalPrice = sum.toFixed(2);
        //
        //     console.log(totalPrice)
        //
        // } else {
        //     console.log(object.total_price)
        //     totalPrice = object.total_price
        //     console.log(totalPrice)
        //
        // }
        const ticket = await prisma.ticket.create({
            data: object
        });
        return NextResponse.json(object);
    } catch (error) {
        return NextResponse.json(error);
    }

    // const stream = OpenAIStream(response);
}
