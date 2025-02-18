import {
    ScatterChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Scatter,
    Label,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import Box from "@mui/material/Box";

export default function RenderScatterChart(props) {
    const ratingCleaner = (rating) => {
        let cleanedRating;
        if (rating.endsWith("%")) {
            cleanedRating = rating.replace("%", "");
        } else {
            let splitRating = rating.split("/");
            cleanedRating = splitRating[0];
        }
        return parseInt(cleanedRating);
    };
    const boxOfficeCleaner = (boxOffice) => {
        let cleanedBoxOffice;
        cleanedBoxOffice = boxOffice.replace("$", "");
        cleanedBoxOffice = cleanedBoxOffice.replaceAll(",", "");
        return parseInt(cleanedBoxOffice);
    };
    const tickGenerator = (array) => {
        let highestBoxOffice = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].x > highestBoxOffice) {
                highestBoxOffice = array[i].x;
            }
        }
        let rounded = Math.ceil(highestBoxOffice / 100000000) * 100000000;
        let segment = rounded / 4;
        return [segment, segment * 2, segment * 3];
    };
    const movieArray = props.database.savedMovies;
    if (movieArray === undefined) {
        return <Box></Box>;
    }

    let graphData = null;
    if (movieArray) {
        graphData = movieArray.map((e) => ({
            x: boxOfficeCleaner(e.BoxOffice),
            y: ratingCleaner(e.Rating),
            name: e.Title,
        }));
    }

    return (
        <ScatterChart
            width={730}
            height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
            <CartesianGrid strokeDasharray="4" />
            <XAxis
                dataKey="x"
                name="Box Office"
                unit="USD"
                type="number"
                ticks={tickGenerator(graphData)}
            >
                <Label value="Box Office" offset={-4} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="y" name="Rotten Tomatoes Score" unit="%">
                <Label
                    value="Ratings"
                    offset={-4}
                    angle={-90}
                    position="insideLeft"
                />
            </YAxis>
            {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
            <Tooltip cursor={{ strokeDasharray: "4" }} content={ChartTooltip} />
            <Legend verticalAlign="top" height={36} />
            <Scatter name="Movies" data={graphData} fill="#087f23" />
        </ScatterChart>
    );
}
