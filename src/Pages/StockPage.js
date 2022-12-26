import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { GET_STOCK_DATA } from "../config/api";
import LetteredAvatar from 'react-lettered-avatar';
import StockChart from "../components/StockChart";

function StockPage() {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isTracked, setIsTracked] = useState(!!localStorage.getItem(id));
    const [portfolio, setPortfolio] = useState(0);

    const fetchStock = async () => {
        const { data } = await axios.get(`${GET_STOCK_DATA}${id}`);
        console.log(data.data[0])
        setData(data.data[0])
    };

    useEffect(() => {
        fetchStock();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isTracked) {
            calculatePortfolio();
        }
    }, [data])

    function addToLocalStorage() {
        localStorage.setItem(id, data.lastPrice)
        setIsTracked(true);
        calculatePortfolio();
    }

    function calculatePortfolio() {
        const oldPrice = localStorage.getItem(id);
        const currentPrice = data?.lastPrice;
        const change = parseFloat(currentPrice) - parseFloat(oldPrice);
        const percentChange = (change * 100) / parseFloat(oldPrice, 10)
        setPortfolio(percentChange?.toFixed(2));
    }

    if (!data) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    return (
        <Grid container sx={{ padding: 2 }}>
            <Grid item md={12} lg={3} sx={{
                borderRight: { lg: "2px solid grey" },
            }}>
                <LetteredAvatar
                    size={100}
                    radius={20}
                    name={data.companyName}
                />
                <br />
                <Typography variant="h5" sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                }}>
                    {data?.companyName}
                </Typography>
                <Typography variant="h6">
                    Current Price: {data?.lastPrice}
                </Typography>
                <Typography variant="body1">
                    52 Weeks High: {data?.high52}
                </Typography>
                <Typography variant="body1">
                    52 Weeks Low: {data?.low52}
                </Typography>
                <br />
                {isTracked ? <h1 style={{
                    color: portfolio >= 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                }}>{portfolio}%</h1> : <Button variant="outlined" color="secondary" onClick={addToLocalStorage}>Track</Button>}
            </Grid>
            <Grid item md={12} lg={9}>
                <StockChart id={id} />
            </Grid>
        </Grid>
    )
}

export default StockPage