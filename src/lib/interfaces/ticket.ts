import {z} from "zod";

export interface Ticket {
    id: string;
    price: string;
    date: string;
    time: string;
    clinic: string;
    address: string;
    user: string;
    receipt_number: string;
    patient: string;
    hc_number: string;
    service: string;
    quantity: string;
    unit_price: string;
    total_price: string;
    amount_received: string;
    change: string;
    ticket_number: string;
    appointment_date: string;
    appointment_time: string;
    createdAt: Date | string;
}
