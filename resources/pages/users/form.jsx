import { 
    TextField, 
    Grid, 
    Typography, 
    Divider, 
    MenuItem,
    Stack, 
    Button 
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";

export default function Form() {
    const history = useNavigate();
    const { id } = useParams();

    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        role_id: null,
        password: "",
        password_confirmation: ''
    });

    useEffect(()=> {
        if(id === undefined) return;
        axios.get(`http://localhost:8000/api/users/${id}`)
        .then(({data}) => setUser(data.data))
        .catch((error) => console.log(error))
    }, []);

    useEffect(()=> {
        axios.get('http://localhost:8000/api/catalog/users/roles')
        .then((response) => {
            const { data } = response;
            setRoles(data.data);
        })
        .catch((error) => console.log(error));
    }, []);

    const handleChange = (event) => {
        const {
            target: { name, value },
        } = event;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const petition = (!id) ? 
            axios.post('http://localhost:8000/api/users', user) :
            axios.put(`http://localhost:8000/api/users/${id}`, user);
        
        petition
        .then((response)=> {
            console.log(response);
            history('/users');
        })
        .catch((error) => console.log(error))
    }

    return (
        <Layout>
            <Grid container justifyContent={"center"}>
                <Grid item md={8}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4">Usuario</Typography>
                        <Divider style={{ margin: "24px 0px" }} />
                        <TextField
                            fullWidth
                            margin={"normal"}
                            label="Nombre"
                            name="name"
                            style={{ marginTop: "0px" }}
                            onChange={handleChange}
                            value={user.name}
                        />
                        <TextField
                            fullWidth
                            margin={"normal"}
                            label="Correo Electronico"
                            name="email"
                            onChange={handleChange}
                            value={user.email}
                        />
                        <TextField
                            select
                            fullWidth
                            name="role_id"
                            margin="normal"
                            label="Escoja el rol"
                            value={user.role_id || ""}
                            onChange={handleChange}
                        >
                            {roles.map(({ id, name }, key) => (
                                <MenuItem key={key} value={id}>
                                    {name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            margin={"normal"}
                            label="Contraseña"
                            name="password"
                            type="password"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin={"normal"}
                            label="Confirmar Contraseña"
                            name="password_confirmation"
                            type="password"
                            onChange={handleChange}
                        />
                        <Stack
                        direction="row"
                        justifyContent="end"
                        style={{marginTop: '24px'}}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                type="submit"
                            >
                                Guardar
                            </Button>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </Layout>
    );
}
