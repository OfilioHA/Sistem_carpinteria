import {
    Table,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    TableBody,
    Typography,
} from "@mui/material";

export function WorkerContractsTable({ contracts }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Puesto</TableCell>
                        <TableCell>Salario</TableCell>
                        <TableCell>Comienza</TableCell>
                        <TableCell>Termina</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contracts.map((item, key) => (
                        <TableRow key={key}>
                            <TableCell>
                                {item["code"] ? item["code"] : "-------"}
                            </TableCell>
                            <TableCell>{item["job_name"]}</TableCell>
                            <TableCell>{item["salary"]}</TableCell>
                            <TableCell>{item["start_at"]}</TableCell>
                            <TableCell>
                                {item["end_at"] ? item["end_at"] : "Indefinido"}
                            </TableCell>
                        </TableRow>
                    ))}
                    {!contracts.length && (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Typography align="center">
                                    No se han registrado contratos
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
