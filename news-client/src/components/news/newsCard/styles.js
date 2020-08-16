import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '512px'
    },
    media: {
        height: '384px',
    },
    title: {
        textOverflow: 'ellipsis',
        fontSize: '20px',
        overflow: 'hidden',
        width: '100%',
        height: '30px',
        whiteSpace: 'nowrap',
        margin: 0
    },
    description: {
        width: '100%',
        overflow: 'hidden',
        height: '50px'
    },
    cardContent: {
        padding: '24px'
    }
}));