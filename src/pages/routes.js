import Head from "next/head";
import { Toaster } from "react-hot-toast";
import ROUTES from "@/data/ROUTES"; // Corrected import
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import ShadCN Card components
import { LinkIcon } from "lucide-react"; // Import Lucide icon

export default function Routes() {
    return (<>
        <Head>
            <title>Routes | Arcade Progress Tracker</title>
        </Head>

        <div className="container mx-auto py-10 px-4"> {/* Added padding and centering */}
            <Card className="w-full max-w-2xl mx-auto"> {/* Center card and limit width */}
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center"> {/* Center title */}
                        Available Routes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4"> {/* Add vertical spacing between list items */}
                        {ROUTES.map((route) => ( // Simplified return and added parentheses
                            <li key={route.name} className="flex items-center justify-between p-3 bg-muted rounded-md"> {/* Added padding, background, rounding */}
                                <span className="text-lg font-medium">{route.name}</span> {/* Style route name */}
                                <Link
                                    target="_blank"
                                    href={route.path}
                                    className="flex items-center gap-1 text-primary hover:underline" // Style link
                                >
                                    <LinkIcon className="h-4 w-4" /> {/* Add icon */}
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