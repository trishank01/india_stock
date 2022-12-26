import axios from "axios";
import { useEffect, useState } from "react";
import { GET_INTRA_DAY_DATA } from "../config/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

const StockChart = ({ id }) => {
    const [data, setData] = useState([]);

    const fetchIntradayData = async () => {
        const { data } = await axios.get(`${GET_INTRA_DAY_DATA}${id}`);
        console.log(data);
        setData(data)
    };

    useEffect(() => {
        fetchIntradayData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <LineChart
            width={1100}
            height={600}
            data={data}
        >
            <XAxis dataKey="name" />
            <YAxis type="number" domain={['dataMin', 'dataMax']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="currentTradingPrice" stroke="#82ca9d" dot={{ r: 0 }} activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default StockChart;
