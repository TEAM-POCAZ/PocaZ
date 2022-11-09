import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Main from "./pages/Main";
import CommunityList from "./pages/CommunityList";
import CommunityDetail from "./pages/CommunityDetail";
import CommunityWrite from "./pages/CommunityWrite";
import CommunityBoast from "./pages/CommunityBoast";
import CommunitySearchResult from "./pages/CommunitySearchResult";
import ChatMain from "./pages/ChatMain";
import Chat from "./components/chat/Chat.jsx";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import MyIdol from "./pages/MyIdol";
import { ToastContainer } from "react-toastify";
import MarketList from "./pages/MarketList";
import MarketWrite from "./pages/MarketWrite";
import MarketDetail from "./pages/Market/MarketDetail";
import WithdrawalUser from "./pages/WithdrawalUser";
import DevelopmentError from "./pages/DevelopmentError";
import NotFound from "./pages/NotFound";

function App({ socket }) {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                notifyOnChangeProps: "tracked",
            },
        },
    });
    return (
        <>
            <QueryClientProvider client={client}>
                {/* devtools */}
                <ReactQueryDevtools initialIsOpen={true} />
                <ToastContainer />
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="Market">
                            <Route index element={<MarketList />} />
                            <Route
                                path=":id"
                                element={<MarketDetail socket={socket} />}
                            />
                        </Route>
                        <Route path="MarketWrite" element={<MarketWrite />} />
                        <Route
                            path="CommunityList"
                            element={<CommunityList />}
                        />
                        <Route
                            path="Community/:category/:id"
                            element={<CommunityDetail />}
                        />
                        <Route path="Community/" element={<CommunityWrite />} />
                        <Route
                            path="CommunityBoast"
                            element={<CommunityBoast />}
                        />
                        <Route
                            path="CommunitySearchResult"
                            element={<CommunitySearchResult />}
                        />
                        <Route
                            path="/chat/list"
                            element={<ChatMain socket={socket} />}
                        />
                        <Route
                            path="/chat"
                            element={<Chat socket={socket} />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/MyPage" element={<MyPage />} />
                        <Route
                            path="/WithdrawalUser"
                            element={<WithdrawalUser />}
                        />
                        <Route path="/MyIdol" element={<MyIdol />} />
                        <Route
                            path="/developmentError"
                            element={<DevelopmentError />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    );
}

export default App;
