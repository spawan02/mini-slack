interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout(props: Props) {
    return <div className="w-full">
        {props.children}
    </div>
}
