// import React, { useState } from "react";
// import { Search, Settings, HelpCircle, LogOut } from "lucide-react";
// import Logo from "../assets/logo.png";
// import { Link } from "react-router-dom";
// import useAuthStore from "../store/authStore";
// import { toast } from "react-hot-toast";

// const navbar = () => {
//   const { user, logout } = useAuthStore(); // Assuming logout is available in authStore
//   const [showMenu, setShowMenu] = useState(false);

//   const avatarUrl = user
//     ? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
//         user.username
//       )}`
//     : "";

//   const handleLogout = async () => {
//     const { message } = await logout();
//     toast.success(message);
//     setShowMenu(false);
//   };

//   return (
//     <nav className="bg-black text-gray-200 flex items-center justify-between p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
//       <Link to={"/"}>
//         <img
//           src={Logo}
//           alt="Logo"
//           className="w-24 cursor-pointer filter brightness-200"
//         />
//       </Link>

//       <ul className="hidden md:flex space-x-5">
//         <Link to={"/"}>
//           <li className="cursor-pointer hover:text-[#e50914]">Home</li>
//         </Link>
//         <Link to={"/TVShows"}>
//           <li className="cursor-pointer hover:text-[#e50914]">TV Shows</li>
//         </Link>
//         <Link to={"/TrendingMovies2"}>
//           <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
//         </Link>
//         <Link to={"/TrendingAnime"}>
//           <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
//         </Link>
//         <Link to={"/TrendingGames"}>
//           <li className="cursor-pointer hover:text-[#e50914]">Games</li>
//         </Link>
//         <Link to={"/NewAndPopular "}>
//           <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
//         </Link>
//         <Link to={"/Upcoming"}>
//           <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
//         </Link>
//       </ul>

//       <div className="flex items-center space-x-2 relative">
//         <div className="relative hidden md:inline-flex">
//           <input
//             type="text"
//             className="bg-[#333333] px-4 py-2 rounded-full min-w-[42px] pr-10 outline-none"
//             placeholder="Search.."
//           />
//           <Search className="absolute top-2 right-5 w-5 h-5" />
//         </div>
//         <Link to={user ? "/ai-recommendations" : "/signin"}>
//           <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">
//             Get AI Movies Picks
//           </button>
//         </Link>

//         {!user ? (
//           <Link to={"/signin"}>
//             <button className="border border-[#333333] py-2 px-4 cursor-pointer">
//               Sign In
//             </button>
//           </Link>
//         ) : (
//           <div className="relative text-white">
//             <img
//               src={avatarUrl}
//               alt=""
//               className="w-10 h-10 rounded-full border-[#e50914] cursor-pointer"
//               onClick={() => setShowMenu(!showMenu)}
//             />

//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
//                 <div className="flex flex-col items-center mb-2">
//                   <span className="text-white font-semibold text-base">
//                     {user.username}
//                   </span>
//                   <span className="text-xs text-gray-400">{user.email}</span>
//                 </div>

//                 <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
//                   <HelpCircle className="w-5 h-5" />
//                   Help Center
//                 </button>

//                 <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
//                   <Settings className="w-5 h-5" />
//                   Settings
//                 </button>

//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer"
//                 >
//                   <LogOut className="w-5 h-5" />
//                   Log Out
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default navbar;



import React, { useState } from "react";
import { Search, Settings, HelpCircle, LogOut } from "lucide-react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const avatarUrl = user
    ? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  // 🔍 Fetch search results from TMDB
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Navigate to a search results page
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="bg-black text-gray-200 flex items-center justify-between p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <Link to={"/"}>
        <img src={Logo} alt="Logo" className="w-24 cursor-pointer filter brightness-200" />
      </Link>

      {/* --- Middle Nav Links --- */}
      <ul className="hidden md:flex space-x-5">
        <Link to={"/"}><li className="cursor-pointer hover:text-[#e50914]">Home</li></Link>
        <Link to={"/TVShows"}><li className="cursor-pointer hover:text-[#e50914]">TV Shows</li></Link>
        <Link to={"/TrendingMovies2"}><li className="cursor-pointer hover:text-[#e50914]">Movies</li></Link>
        {/* <Link to={"/TrendingAnime"}><li className="cursor-pointer hover:text-[#e50914]">Anime</li></Link> */}
        {/* <Link to={"/TrendingGames"}><li className="cursor-pointer hover:text-[#e50914]">Games</li></Link> */}
        <Link to={"/NewAndPopular"}><li className="cursor-pointer hover:text-[#e50914]">New & Popular</li></Link>
        <Link to={"/Upcoming"}><li className="cursor-pointer hover:text-[#e50914]">Upcoming</li></Link>
      </ul>

      {/* --- Search + Buttons --- */}
      <div className="flex items-center space-x-4 relative">
        <form onSubmit={handleSearch} className="relative hidden md:inline-flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#333333] px-4 py-2 rounded-full min-w-[42px] pr-10 outline-none"
            placeholder="Search..."
          />
          <button type="submit">
            <Search className="absolute top-2 right-5 w-5 h-5 cursor-pointer" />
          </button>
        </form>

        <Link to={user ? "/ai-recommendations" : "/signin"}>
          <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">
            Get AI Movies Picks
          </button>
        </Link>

        {/* --- Auth Section --- */}
        {!user ? (
          <Link to={"/signin"}>
            <button className="border border-[#333333] py-2 px-4 cursor-pointer">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="relative text-white">
            <img
              src={avatarUrl}
              alt=""
              className="w-10 h-10 rounded-full border-[#e50914] cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>

                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <HelpCircle className="w-5 h-5" />
                  Help Center
                </button>

                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
