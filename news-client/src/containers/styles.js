import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        overflowY: 'auto'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        borderBottom: '1px solid ' + theme.palette.primary.textColor,
        height: '72px'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        minHeight: '72px'
    },
    content: {
        height: '100%',
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbarItems: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    logo: {
        width: '256px'
    },
    apiTokenForm: {
        display: 'flex',
        height: 'calc(100% - 144px)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        width: '512px',
        height: '56px',
        marginBottom: '8px'
    },
    darkMode: {
        textAlign: "right"
    }
}));