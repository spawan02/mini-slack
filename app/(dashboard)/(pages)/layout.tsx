import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


interface Props {
    children: React.ReactNode;
}
export default async function PageLayout(props: Props) {
    const session = await getServerSession(authOptions);

    // if (!session) {
    //     redirect("/")
    // }
    return (
        <div>
            {props.children}
        </div>
    )
}