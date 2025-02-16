import React from "react";
import {CircleUser, Trash2} from "lucide-react";
import {formatDate} from "@/lib/utils";

interface ICommentProps {
    comment: TComment
}

export const Comment: React.FC<ICommentProps> = ({ comment }) => {
    return (
        <div className={"p-6 border border-gray-600 relative rounded-md"}>
            <div className={"absolute top-4 right-4"}>
                <button className={"flex gap-2 p-2 text-sm items-center text-white font-bold bg-red-600 rounded-md"}><Trash2 size={20} /> Delete</button>
            </div>
            <div className={"flex flex-col text-slate-300"}>
                <div className={"flex gap-2 items-center capitalize"}>
                    <CircleUser />
                    {comment?.user.username}
                </div>
                <div className={'text-slate-500'}>
                    {formatDate(comment.createdAt)}
                </div>
                <p className={"text-white text-lg"}>{comment.content}</p>
            </div>
        </div>
    )
}