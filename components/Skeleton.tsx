import { Skeleton as AntdSkeleton } from "antd"

export const Skeleton = () => {
    return <div className="bg-white p-5 rounded-xl">
        <AntdSkeleton active={true} />
    </div>
}