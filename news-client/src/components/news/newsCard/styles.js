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
        height: '74px'
    },
    cardContent: {
        padding: '24px 24px 0px 24px'
    },
    fade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        margin: 0,
        padding: '24px 0',
        backgroundImage: 'linear-gradient(to bottom, transparent, white)'
    },
    overlap: {
        paddingLeft: '24px',
        marginTop: '-18px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '16px',
        background: 'rgba(0,0,0,0.5)'
    }
}));