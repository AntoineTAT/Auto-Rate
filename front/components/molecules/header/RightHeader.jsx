import HeaderItem from "../../atoms/header/HeaderItem";
import Link from "next/link"
import { LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react/cjs/react.development";
import { useRouter } from "next/router"

function RightHeader() {
    return (
        <div className="flex flex-grow justify-evenly max-w-2xl">
            <Link href="/auth/login">
                <a>
                    <HeaderItem title="LOGIN" Icon={LoginIcon} />
                </a>
            </Link>

            <Link href="/profile">
                <a>
                    <HeaderItem title="PROFILE" Icon={UserIcon} />
                </a>
            </Link>

            <Link href="/">
                <a>
                    <HeaderItem title="LOGOUT" Icon={LogoutIcon} />
                </a>
            </Link>
        </div>
    )
}

export default RightHeader
