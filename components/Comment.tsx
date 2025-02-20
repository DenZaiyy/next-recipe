import React from "react";
import { CircleUser, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

interface ICommentProps {
  comment: TComment;
}

export const Comment: React.FC<ICommentProps> = ({ comment }) => {
  const { user } = useUser();

  return (
    <div className={"p-6 border border-gray-600 relative rounded-md"}>
      {comment.userId === user?.id && (
        <div className={"absolute top-4 right-4"}>
          <button
            className={
              "flex gap-2 p-2 text-sm items-center text-white font-bold bg-red-600 rounded-md"
            }
          >
            <Trash2 size={20} /> Delete
          </button>
        </div>
      )}
      <div className={"flex flex-col text-foreground"}>
        <div className={"flex gap-2 items-center capitalize"}>
          <CircleUser />
          {comment.userName}
        </div>
        <div className={"text-foreground/50 text-sm"}>
          {formatDate(comment.createdAt)}
        </div>
        <p className={"text-foreground text-lg"}>{comment.content}</p>
      </div>
    </div>
  );
};
