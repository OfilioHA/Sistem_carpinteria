import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Example from "./components/Example";
import Index from "./pages/index";

//Suppliers
import SuppliersList from "./pages/suppliers/list";
import Purchases from "./pages/purchases";

//Woods
import WoodForm from "./pages/woods/form";

import Layout from "./layouts/Layout";

import Login from "./pages/login";

import { useAuth } from "./libs/auth";

function App() {
    const [logged] = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout>{<Example />}</Layout>} />
                <Route path="/test" element={<Layout>{<Index />}</Layout>} />
                <Route
                    path="/suppliers"
                    element={<Navigate to="/suppliers/list" replace />}
                />
                <Route path="/suppliers/list" element={<SuppliersList />} />
                <Route
                    path="/purchases"
                    element={<Layout>{<Purchases />}</Layout>}
                />
                <Route
                    path="/woods/create"
                    element={<Layout>{<WoodForm />}</Layout>}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

/*
{!logged && (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace />}
                        />
                    </>
                )}
                {logged && (
                    <>

                      </>
                )}
*/

ReactDOM.render(<App />, document.getElementById("app"));
