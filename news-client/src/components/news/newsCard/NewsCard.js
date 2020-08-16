import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

export default function NewsCard({ article }) {
    const classes = useStyles();

    // Open article in new tab
    const handleClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Card data-cy={'newsCard'} className={classes.root}>
            <CardActionArea onClick={e => handleClick(article.url)}>
                <CardMedia
                    className={classes.media}
                    image={article.urlToImage}
                    title={article.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.title}>
                        {article.title}
                    </Typography>
                    <Typography variant='body2' className={classes.description} color='textSecondary'>
                        {article.description}
                    </Typography>
                    <div className={classes.fade}></div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}