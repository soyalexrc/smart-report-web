'use client';
import {useGetTicketsQuery} from "@/lib/store/services/ticket";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {TicketsDataTable} from "@/lib/helpers/ticket/data-table";
import {columns} from "@/lib/helpers/ticket/columns";

export default function ReportsPage() {
    const { data: tickets, error, isLoading, refetch } = useGetTicketsQuery();

    if (isLoading) return 'loading...'

    if (error) return 'error ocurred'

    return (
        <div>
            <Button className='mb-4' onClick={refetch}>Volver a cargar</Button>
            <TicketsDataTable data={tickets!} columns={columns} />
        </div>
    )
}
