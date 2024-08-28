/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/slices";

import Header from "./components/head/Head";
import Footer from "./components/footer_comp/Foot";
import Home from "./pages/homePage/HomePage";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    
    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        await fetchApiConfig();
        await fetchGenres();
    };

    const fetchApiConfig = async () => {
        try {
            const res = await fetchDataFromApi("/configuration");
            const urlConfig = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };
            dispatch(getApiConfiguration(urlConfig));
        } catch (error) {
            console.error("Failed to fetch API configuration", error);
        }
    };

    const fetchGenres = async () => {
        try {
            const endPoints = ["tv", "movie"];
            const promises = endPoints.map((endpoint) =>
                fetchDataFromApi(`/genre/${endpoint}/list`)
            );

            const results = await Promise.all(promises);
            const allGenres = results.reduce((acc, { genres }) => {
                genres.forEach((genre) => {
                    acc[genre.id] = genre;
                });
                return acc;
            }, {});

            dispatch(getGenres(allGenres));
        } catch (error) {
            console.error("Failed to fetch genres", error);
        }
    };

    return (
        <>
        <BrowserRouter>
           <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </>
    );
}

export default App;
