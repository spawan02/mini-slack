import Redirect from "@/components/Redirect";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


interface Props {
    children: React.ReactNode;
}
export default async function (props: Props) {
    const session = getServerSession(authOptions);

    if (!session) {
        <Redirect to={'/signin'} />
    }
    return (
        <div>
            {props.children}
        </div>
    )
}