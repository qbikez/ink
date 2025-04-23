import React, { useEffect, useState } from "react";
import Box from "../components/Box.js";
import { useStdout } from "../index.js";
export function Viewport(props) {
    const { height, width } = useViewportDimensions();
    return (React.createElement(Box, { ...props, height: height, width: width }, props.children));
}
export function useViewportDimensions() {
    const { stdout } = useStdout();
    const [dimensions, setDimensions] = useState({
        height: stdout.rows,
        width: stdout.columns,
    });
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({ height: stdout.rows, width: stdout.columns });
        };
        stdout.on("resize", updateDimensions);
        return () => {
            stdout.off("resize", updateDimensions);
        };
    }, [stdout]);
    return dimensions;
}
//# sourceMappingURL=Viewport.js.map