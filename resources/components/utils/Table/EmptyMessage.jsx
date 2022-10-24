import { TableCell, TableRow } from "@mui/material";

export function EmptyMessage({ colSpan, loading, rowsAmount }) {
    return (
        <>
            {loading && !rowsAmount && (
                <TableRow>
                    <TableCell colSpan={colSpan}>
                        Cargando datos
                    </TableCell>
                </TableRow>
            )}
            {!loading && !rowsAmount && (
                <TableRow>
                    <TableCell colSpan={colSpan}>
                        No existen datos
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}
