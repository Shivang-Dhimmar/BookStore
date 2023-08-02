import { makeStyles } from "@material-ui/core";

const ButtonStyle=makeStyles((theme)=>({
        button:{
            "& .MuiButtonBase-root": {
                margin: "2px"
              },
        },
}));
export {ButtonStyle};