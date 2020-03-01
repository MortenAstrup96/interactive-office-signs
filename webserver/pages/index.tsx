import {Button} from "@material-ui/core";
import Link from "next/link";

export default function Index() {
    // The following line has optional chaining, added in Next.js v9.1.5,
    // is the same as `data && data.author`

    return (
        <div>
            <Link href="/p/[id]" as={`/p/7913`}>
                <Button variant={"contained"} color={"primary"}>
                    Office Sign
                </Button>
            </Link>

            <Link href="user">
                <Button variant={"contained"} color={"primary"}>
                    Settings
                </Button>
            </Link>

        </div>
    );
}