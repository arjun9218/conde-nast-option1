import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    content: {
        height: '100%',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbarItems: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logo: {
        width: '256px'
    },
    searchFilters: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up(1080)]: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
        }
    },
    searchFiltersPaper: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'sticky',
        top: '72px'
    },
    textField: {
        width: '256px',
        margin: '24px'
    },
    button: {
        margin: '24px',
        width: '144px'
    },
    darkMode: {
        textAlign: 'right'
    },
    newsGrid: {
        display: 'grid',
        [theme.breakpoints.up(1080)]: {
            gridTemplateColumns: 'repeat(1, 1fr)'
        },
        [theme.breakpoints.up(1280)]: {
            gridTemplateColumns: 'repeat(2, 1fr)'
        },
        [theme.breakpoints.up(1600)]: {
            gridTemplateColumns: 'repeat(3, 1fr)'
        },
        gridGap: '24px',
        marginTop: '24px',
        marginBottom: '24px'
    },
    loading: {
        width: '100%',
        marginTop: '24px',
        fontSize: '24px',
        marginBottom: '24px',
        textAlign: 'center'
    }
}));
