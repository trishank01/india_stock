import React, { useEffect, useState } from "react";
import {
    Container,
    Pagination,
    TableCell,
    LinearProgress,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
} from "@mui/material";
import axios from "axios";
import { GET_ALL_DATA } from "../config/api";
import LetteredAvatar from 'react-lettered-avatar';
import { useNavigate } from "react-router-dom";

function StockTable() {

    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const fetchData = async () => {
        const { data } = await axios.get(GET_ALL_DATA);
        const modifiedData = data.map(elem => elem.data[0])
        console.log(modifiedData)
        setStockData(modifiedData);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSearch = () => {
        return stockData && stockData.filter(
            (stock) =>
                stock.companyName.toLowerCase().includes(search) ||
                stock.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <Container style={{ textAlign: "center" }}>
            <Typography
                variant="h4"
                style={{ margin: 18, fontFamily: "Montserrat" }}
            >
                Stock Prices Table
            </Typography>
            <TextField
                label="Search For a Stock"
                variant="outlined"
                sx={{
                    marginBottom: 2,
                    width: "100%"
                }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer component={Paper}>
                {loading ? (
                    <LinearProgress style={{ backgroundColor: "gold" }} />
                ) : (
                    <Table aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                            <TableRow>
                                {["Stock Name", "Current Price", "% Change", "Value Change"].map((head) => (
                                    <TableCell
                                        style={{
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Stock Name" ? "inherit" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    const profit = row.pChange > 0;
                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/stock/${row.symbol}`)}
                                            sx={{
                                                cursor: "pointer",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={row.symbol}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{
                                                    display: "flex",
                                                    gap: 15,
                                                }}
                                            >
                                                <LetteredAvatar
                                                    size={50}
                                                    radius={20}
                                                    name={row.companyName}
                                                    backgroundColors={[
                                                        '#2ecc71',
                                                        '#3498db',
                                                        '#8e44ad',
                                                        '#e67e22',
                                                        '#e74c3c',
                                                        '#1abc9c',
                                                        '#2c3e50'
                                                    ]}
                                                />
                                                <div
                                                    style={{ display: "flex", flexDirection: "column" }}
                                                >
                                                    <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                    >
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgrey" }}>
                                                        {row.companyName}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.lastPrice}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {profit && "+"}
                                                {row.pChange}%
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.change}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination
                count={parseInt((handleSearch()?.length / 10).toFixed(0), 10)}
                sx={{
                    padding: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                color="primary"
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    )
}

export default StockTable