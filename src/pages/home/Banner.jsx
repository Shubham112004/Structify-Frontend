import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import b1 from '../../assets/banner1.jpg';
import b2 from '../../assets/banner2.jpg';
import b3 from '../../assets/banner3.jpg';

function Banner() {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const items = [
        { src: b1 },
        { src: b2 },
        { src: b3 },
    ];

    useEffect(() => {
        const preloadImages = items.map((item) => {
            const img = new Image();
            img.src = item.src;
            return new Promise((resolve) => {
                img.onload = resolve;
            });
        });

        Promise.all(preloadImages).then(() => setImagesLoaded(true));
    }, []);

    if (!imagesLoaded) {
        return <div>Loading...</div>; // Show a loader while images are being preloaded
    }

    return (
        <Carousel className='mt-16' stopAutoPlayOnHover={false} autoPlay={true} interval={3000}>
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item({ item }) {
    return (
        <Paper style={{ textAlign: 'center', padding: '20px' }}>
            <img src={item.src} alt="banner" style={{ width: '100%', borderRadius: '8px' }} />
        </Paper>
    );
}

export default Banner;
