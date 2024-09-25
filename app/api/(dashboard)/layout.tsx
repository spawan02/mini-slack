import Appbar from "@/components/Appbar";


interface Props {
    children: React.ReactNode;
}

export default (props: Props) => {
    return <div className="w-full">
        <Appbar />
        {props.children}
    </div>
}