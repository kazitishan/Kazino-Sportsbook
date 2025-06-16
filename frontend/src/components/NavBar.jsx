import Link from "next/link";

function NavBar(){
    return(
        <nav className="px-8 flex justify-center items-center bg-[#284e13ff]">
            <Link href="/" className="">
                <img src="/logo.svg" alt="Kazino Sportsbook Logo" className="w-30 h-25" />
            </Link>
        </nav>
    );
}

export default NavBar;