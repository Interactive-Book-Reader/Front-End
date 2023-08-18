import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import img1 from 'src/assets/images/products/s4.jpg';
import img2 from 'src/assets/images/products/s5.jpg';
import img3 from 'src/assets/images/products/s7.jpg';
import img4 from 'src/assets/images/products/s11.jpg';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';
import { useState } from "react";



const ecoCard = [
    {
        title: 'Harry Potter and the Philosophers Stone',
        Author: 'J.K. Rowling',
        photo: img1,
        price: 2690,
    },
    {
        title: 'Harry Potter and the Philosophers Stone',
        Author: 'J.K. Rowling',
        photo: img1,
        price: 2690,
    },
    {
        title: 'Harry Potter and the Philosophers Stone',
        Author: 'J.K. Rowling',
        photo: img1,
        price: 2690,
    },
    
];

const Blog = () => {

    return (
        <Grid container spacing={3}>
            {ecoCard.map((product, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
                        <Typography component={Link} to="/mybook">
                            <img src={product.photo} alt="img" width="100%" />
                        </Typography>
                        
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{product.title}</Typography>
                            <Typography variant="h7">{product.Author}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">LKR{product.price}</Typography>
                
                                </Stack>

                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}

        </Grid>
    );
};

export default Blog;
