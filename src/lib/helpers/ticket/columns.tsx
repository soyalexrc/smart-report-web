"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Ticket} from "@/lib/interfaces/ticket";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {ChevronRightIcon, Clipboard} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useToast} from "@/components/ui/use-toast";

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "service",
        header: "Servicio",
        cell: ({row}) => {
            const quantity = row.original.quantity;
            const service = row.original.service;
            const total_price: string = row.original.total_price;

            if (service.includes(',')) {
                return (
                    <div className=''>
                        {
                            service.split(',').map((str, index) => (
                                <div key={str} className='flex gap-3 mb-2'>
                                    <p className='font-bold'>{quantity?.split(',')[index]}</p>
                                    <p>{str}:</p>
                                    <p className='font-bold'>S/. {total_price.split(',')[index]}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            return (
                <div className='flex gap-2 mb-2'>
                    <p className='font-bold'>{quantity}</p>
                    <p>{service}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "receipt_number",
        header: "Nro Ticket",
        cell: ({row}) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {toast} = useToast()
            const receipt_number = row.original.receipt_number;

            function copyToClipboard(value: string) {
                navigator.clipboard.writeText(value).then(result => {
                    toast({
                        title: 'Se copio el numero de ticket en el porta papeles',
                    })
                })
            }

            return (
                <div className='flex items-center gap-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Clipboard className="h-4 w-4 cursor-pointer" onClick={() => copyToClipboard(receipt_number)}/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copiar numero de ticket</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <p>{receipt_number}</p>

                </div>
            )
        }
    },
    {
        accessorKey: "patient",
        header: "Paciente",
        cell: ({row}) => {
            const patient = row.original.patient;
            if (patient.includes(',')) {
                return <div>
                    {patient.split(',').map(str => (
                        <p key={str}>{str}</p>
                    ))}
                </div>
            } else {
                return patient
            }
        }
    },

    {
        accessorKey: "date",
        header: "Fecha de emision",
        cell: ({ row }) => {
            const date = row.original.date;
            const time = row.original.time;

            return (
                <div className='flex gap-2'>
                    <p>{date}</p>
                    <span>-</span>
                    <p>{time}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Fecha de registro",
        cell: ({row}) => {
            const createdDate: string = row.getValue('createdAt')
            return <p>{format(createdDate, 'P')}</p>
        }
    },
    {
        accessorKey: "price",
        header: "Precio total",
        cell: ({row}) => {
            const price = row.original.price;
            return <p><span className='font-bold'>S/. </span>{price}</p>
        }
    },
]
