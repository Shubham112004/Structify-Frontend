import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import b1 from '../../assets/banner1.jpg'
import b2 from '../../assets/banner2.jpg'
import b3 from '../../assets/banner3.jpg'

function Banner() {
    const items = [
        {
            src: b1,
        },
        {
            src: b2,
        },
        {
            src: b3,
        },
    ];

    return (
        <Carousel className='mt-16'>
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item({ item }) {
    return (
        <Paper style={{ textAlign: 'center', padding: '20px' }}>
            <img src={item.src} alt={item.name} style={{ width: '100%', borderRadius: '8px' }} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
        </Paper>
    );
}

export default Banner;
