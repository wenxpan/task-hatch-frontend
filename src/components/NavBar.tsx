import React from "react"

// props types
interface NavBarProps {
  title: string
  logo: string
  toggleSidebar: () => void
}

const NavBar: React.FC<NavBarProps> = ({
  title = "App Title",
  logo,
  toggleSidebar
}) => {
  const menuSVG = (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>menu_fill</title>
      <g
        id="页面-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Editor"
          transform="translate(-1248.000000, -48.000000)"
          fillRule="nonzero"
        >
          <g id="menu_fill" transform="translate(1248.000000, 48.000000)">
            <path
              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
              id="MingCute"
              fillRule="nonzero"
            ></path>
            <path
              d="M20,17.5 C20.8284,17.5 21.5,18.1716 21.5,19 C21.5,19.7796706 20.9050879,20.4204457 20.1444558,20.4931332 L20,20.5 L4,20.5 C3.17157,20.5 2.5,19.8284 2.5,19 C2.5,18.2203294 3.09488554,17.5795543 3.85553954,17.5068668 L4,17.5 L20,17.5 Z M20,10.5 C20.8284,10.5 21.5,11.1716 21.5,12 C21.5,12.8284 20.8284,13.5 20,13.5 L4,13.5 C3.17157,13.5 2.5,12.8284 2.5,12 C2.5,11.1716 3.17157,10.5 4,10.5 L20,10.5 Z M20,3.5 C20.8284,3.5 21.5,4.17157 21.5,5 C21.5,5.82843 20.8284,6.5 20,6.5 L4,6.5 C3.17157,6.5 2.5,5.82843 2.5,5 C2.5,4.17157 3.17157,3.5 4,3.5 L20,3.5 Z"
              id="形状"
              fill="#09244BFF"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        {/* Left Section of NavBar */}
        <div className="flex justify-start items-center">
          {/* hamburger icon */}
          <button
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={toggleSidebar}
          >
            {menuSVG}
          </button>
          {/* Logo and Title */}
          <a href="/" className="flex items-center">
            <img src={logo} className="mr-3 rounded-full h-8 w-8"></img>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {title}
            </span>
          </a>
        </div>

        {/* Right Section of navbar */}
        {/* <div className="flex items-center"></div> */}
      </div>
    </nav>
  )
}

export default NavBar
