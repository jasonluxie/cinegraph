import React from "react";
import Box from "@mui/material/Box";

export default function NoMatch() {
    return (
        <Box>
            <img
                src="https://picsum.photos/500/500"
                height="500"
                width="500"
                alt='placeholder from lorem picsum'
            />
            <h3>Oh no! Wrong turn!</h3>
        </Box>
    );
}
