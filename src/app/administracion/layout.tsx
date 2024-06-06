'use client'
import {HandCoins, Home, Menu, Settings} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {Provider} from "react-redux";
import {store} from "@/lib/store";
import {useState} from "react";



type LinkType = {
    title: string,
    route: string,
    icon: JSX.Element
}

const links: LinkType[] = [
    {
        title: 'Reportes',
        route: '/administracion',
        icon: <Home className="h-4 w-4"/>
    },
    {
        title: 'Ingreso de tickets',
        route: '/administracion/ingreso-de-tickets',
        icon: <HandCoins className="h-4 w-4"/>
    },
]

export default function DashboardLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Provider store={store}>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/reportes" className="flex items-center gap-2 font-semibold">
                                <span className="">Smart Report</span>
                            </Link>
                            {/*<Button variant="outline" size="icon" className="ml-auto h-8 w-8">*/}
                            {/*    <Bell className="h-4 w-4"/>*/}
                            {/*    <span className="sr-only">Toggle notifications</span>*/}
                            {/*</Button>*/}
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                {
                                    links.map((link) => (
                                        <Link
                                            key={link.route}
                                            href={link.route}
                                            prefetch={true}
                                            className={`${pathname === link.route && 'bg-muted'} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                                        >
                                            {link.icon}
                                            {link.title}
                                        </Link>
                                    ))
                                }
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <span className="sr-only">Acme Inc</span>
                                    </Link>
                                    {
                                        links.map((link) => (
                                            <Link
                                                key={link.route}
                                                href={link.route}
                                                prefetch={true}
                                                onClick={() => setOpen(false)}
                                                className={`${pathname === link.route && 'bg-muted'} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                                            >
                                                {link.icon}
                                                {link.title}
                                            </Link>
                                        ))
                                    }
                                </nav>
                                <div className="mt-auto">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Upgrade to Pro</CardTitle>
                                            <CardDescription>
                                                Unlock all features and get unlimited access to our
                                                support team.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button size="sm" className="w-full">
                                                Upgrade
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1"/>
                        <SignedOut>
                            <SignInButton/>
                        </SignedOut>
                        <SignedIn>
                            <UserButton/>
                        </SignedIn>
                    </header>
                    <main className="p-4 lg:p-6  h-screen">
                        {children}
                    </main>
                </div>
            </div>
        </Provider>
    )
}
