import axios from 'axios';
import React from 'react'
import { INDICES_URL } from "../../config/api"
import { useState } from 'react'
import { useEffect } from 'react';
import LetteredAvatar from 'react-lettered-avatar';
import AliceCarousel from "react-alice-carousel";

function Carousel() {

    const [indices, setIndices] = useState([]);

    const fetchIndices = async () => {
        const { data } = await axios.get(INDICES_URL);
        setIndices(data.data);
    }

    useEffect(() => {
        fetchIndices();
    }, [])

    const items = indices.map((stock) => {
        let profit = stock?.percChange >= 0;
        return (
            <>
                <LetteredAvatar
                    size={50}
                    radius={20}
                    name={stock.indexName}
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
                <span style={{ color: "white" }}>
                    {stock?.indexName}
                    <br />
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {stock?.percChange}%
                    </span>
                </span>
                <br />
                <span style={{ fontSize: 22, fontWeight: 500, color: "white" }}>
                    {`₹ ${stock?.last}`}
                </span>
            </>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    );
}

export default Carousel