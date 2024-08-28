import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [scrollPosition, setScrollPosition] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !isMobileMenuOpen) {
                setScrollPosition("hide");
            } else {
                setScrollPosition("show");
            }
        } else {
            setScrollPosition("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const handleSearchQuery = (event) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            navigate(`/search/${searchQuery}`);
            setTimeout(() => {
                setIsSearchVisible(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setIsMobileMenuOpen(false);
        setIsSearchVisible(true);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
        setIsSearchVisible(false);
    };

    const navigateTo = (path) => {
        navigate(`/explore/${path}`);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`header ${isMobileMenuOpen ? "mobileView" : ""} ${scrollPosition}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="Movix Logo" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigateTo("movie")}>
                        Movies
                    </li>
                    <li className="menuItem" onClick={() => navigateTo("tv")}>
                        TV Shows
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {isMobileMenuOpen ? (
                        <VscChromeClose onClick={toggleMobileMenu} />
                    ) : (
                        <SlMenu onClick={toggleMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {isSearchVisible && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or TV show..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyUp={handleSearchQuery}
                            />
                            <VscChromeClose onClick={() => setIsSearchVisible(false)} />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
