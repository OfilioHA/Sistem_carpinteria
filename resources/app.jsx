import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Example from "./components/Example";

//Suppliers
import SuppliersList from "./pages/suppliers/list";
import Purchases from "./pages/purchases";

//Woods
import WoodForm from "./pages/woods/form";
import WoodList from "./pages/woods/list";

import Layout from "./layouts/Layout";

import Login from "./pages/login";

import UserList from "./pages/users/list";
import UserForm from "./pages/users/form";
 
import { useAuth } from "./libs/auth";

function App() {
    const [logged] = useAuth();

    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
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
                            <Route
                                path="/"
                                element={<Layout>{<Example />}</Layout>}
                            />
                            {/*Rutas para los proveedores*/}
                            <Route
                                path="/suppliers"
                                element={<SuppliersList />}
                            />
                            {/*Rutas para las compras*/}
                            <Route path="/purchases" element={<Purchases />} />
                            {/*Rutas para la madera*/}
                            <Route path="/woods" element={<WoodList />} />
                            <Route
                                path="/woods/create"
                                element={<WoodForm />}
                            />
                            <Route
                                path="/woods/edit/:id"
                                element={<WoodForm />}
                            />
                            {/* Rutas para los Usuarios */}
                            <Route
                                path="/users"
                                element={<UserList />}
                            />
                            <Route
                                path="/users/create"
                                element={<UserForm />}
                            />
                            <Route
                                path="/users/edit/:id"
                                element={<UserForm />}
                            />
                            {/*Rutas Generales*/}
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
