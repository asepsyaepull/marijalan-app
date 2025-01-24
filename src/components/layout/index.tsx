import { ReactNode, JSX } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
