import { colors, makeStyles } from "@material-ui/core";

const appstyle=makeStyles((theme)=>({
    wrapper:{
        "& .button":{
            backgroundColor: colors.green,
        },
    },
}));

export {appstyle};