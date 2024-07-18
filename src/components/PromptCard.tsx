"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromptCard = ({
  post,
  handleTagClick,
  handleDelete,
  handleEdit,
}: {
  post: any;
  handleTagClick: any;
  handleDelete: any;
  handleEdit: any;
}) => {
  const [copied, setCopied] = useState<string>("");
  const router = useRouter();

  console.log('asdfasdfsad-----',post.creator._id);
// console.log(post);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const { data: session } = useSession();
  const pathName = usePathname();

  const visitingProfile = (post: any) => {
    // console.log(id);
    router.push(`/profile/${post?.creator._id}?name=${post?.creator.username}`)
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h1
              className="font-satoshi font-semibold text-gray-900"
              onClick={() =>
                visitingProfile && visitingProfile(post)
              }
            >
              {post.creator.username}
            </h1>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="kuch bhi"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user?.id === post?.creator._id && pathName === "/profile" && (
        <div>
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;

/* 
http://localhost:3000/profile/669568954c505385ba0d139c?name=?undefined
http://localhost:3000/profile/669568954c505385ba0d139c?name=?pratyushsinha

*/