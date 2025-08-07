import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function PageWrap () {
    return (
        <>
            <Header />
            <main className="page-content">
                {/* Content passed into this component will render here */}
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default PageWrap;