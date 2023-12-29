"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const App = () => {
    const [data, setData] = (0, react_1.useState)(null);
    const handleTestBackend = async () => {
        try {
            const response = await fetch('/tracks/');
            if (response.ok) {
                const tracks = await response.json();
                setData(tracks);
                // You may choose to return tracks here if needed
            }
            else {
                console.error('Failed to fetch data:', response.status);
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "App" }), (0, jsx_runtime_1.jsx)("img", { src: "https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/%24B-Banner-Artist.jfif", alt: "$B Banner" }), (0, jsx_runtime_1.jsx)("audio", { controls: true, children: (0, jsx_runtime_1.jsx)("source", { src: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3", type: "audio/mp3" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleTestBackend, children: "TEST BACKEND" }), data && (0, jsx_runtime_1.jsx)("p", { children: JSON.stringify(data) })] }));
};
exports.default = App;
