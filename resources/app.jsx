import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { RecoilRoot } from "recoil";

import Example from "./components/Example";

//Suppliers
import SuppliersList from "./components/suppliers/list";
import Purchases from "./components/purchases";

//Woods
import WoodForm from "./components/woods/form";
import WoodList from "./components/woods/list";

import Layout from "./layouts/Layout";

import Login from "./components/login";

import UserList from "./components/users/list";
import UserForm from "./components/users/form";

import { useAuth } from "./libs/auth";
import { SuppliersForm } from "./components/suppliers/form";
import { WorkersList } from "./components/workers/list";
import { WorkersForm } from "./components/workers/form";
import { useEffect } from "react";
import axios from "axios";
import { FurnitureList } from "./components/furniture/list";

function App() {
    const [logged] = useAuth();
    //const location = useLocation();
    //const history = useNavigate();

    /*
    useEffect(()=> {
        axios.get('/api/user')
        .then(()=> console.log('logueado'))
        .catch(error => console.log(error)); 
    }, [location])
    */

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
                            <Route path="/" element={<Layout />}>
                                <Route element={<Example />} index />
                                {/*Rutas para los proveedores*/}
                                <Route path="suppliers">
                                    <Route element={<SuppliersList />} index />
                                    <Route
                                        path="create"
                                        element={<SuppliersForm />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<SuppliersForm />}
                                    />
                                </Route>
                                <Route path="workers">
                                    <Route element={<WorkersList />} index />
                                    <Route
                                        path="create"
                                        element={<WorkersForm />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<WorkersForm />}
                                    />
                                </Route>
                                {/*Rutas para las compras*/}
                                <Route path="purchases">
                                    <Route element={<Purchases />} index />
                                </Route>
                                {/*Rutas para los muebles*/}
                                <Route path="furnitures">
                                    <Route element={<FurnitureList />} index />
                                </Route>
                                {/*Rutas para la madera*/}
                                <Route path="woods">
                                    <Route element={<WoodList />} index />
                                    <Route
                                        path="create"
                                        element={<WoodForm />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<WoodForm />}
                                    />
                                </Route>
                                {/* Rutas para los Usuarios */}
                                <Route path="users">
                                    <Route element={<UserList />} index />
                                    <Route
                                        path="create"
                                        element={<UserForm />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<UserForm />}
                                    />
                                </Route>
                            </Route>
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
