"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  //checking whether user is logged-in or not
  const { data: session } = useSession();

  //if user is not logged in we need to loge in
  // const [providers, setProviders] = useState<Record<
  //   LiteralUnion<BuiltInProviderType, string>,
  //   ClientSafeProvider
  // > | null>();

  const [providers, setProviders] = useState<any | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  // console.log(providers);
  // console.log(session);

  useEffect(() => {
    const setProvider = async () => {
      try {
        const res = await getProviders();
        // console.log(res);
        if (res) {
          setProviders(res);
        } else {
          console.error("Failed to fetch providers: Response is undefined");
        }
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      }
    };
    setProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" passHref className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="AIVaani Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">AIVaani</p>
      </Link>

      {/* for Desktop application navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image as string} 
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider?.name}
                  onClick={() => signIn(provider?.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Now for mobile application */}
      {/* {alert(session?.user)} */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={"/assets/images/logo.svg"}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full hover:cursor-pointer"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider?.name}
                  onClick={() => signIn(provider?.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
