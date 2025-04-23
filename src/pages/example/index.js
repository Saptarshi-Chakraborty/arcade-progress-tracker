import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";

const ROUTES = [
    { name: "Home", path: "/example/home" },
    { name: "Upload Report", path: "/example/upload-report" },
    { name: "Participant Lookup", path: "/example/participant-lookup" },
    { name: "Routes", path: "/routes" },
    { name: "Example Page", path: "/example" },
];

export default function Routes() {
    return (<>
        <Head>
            <title>Routes | Arcade Progress Tracker</title>
        </Head>

        <div className="container mx-auto py-10 px-4">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        All Pages of the Website
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {ROUTES.map((route) => (
                            <li key={route.name} className="flex items-center justify-between p-3 bg-muted rounded-md">
                                <span className="text-lg font-medium">{route.name}</span>
                                <Link
                                    target="_blank"
                                    href={route.path}
                                    className="flex items-center gap-1 text-primary hover:underline"
                                >
                                    <LinkIcon className="h-4 w-4" />
                                    Visit
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

        <Toaster />
    </>)
}