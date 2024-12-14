import { useParams } from "react-router-dom";

type HeaderTitle = "hotels" | "cities" | "countries";

function GenericHeader() {
    const { headerTitle, name } = useParams();

    const _headerTitle = {
        hotels: "Hotel",
        cities: "City",
        countries: "Country"
    }

    const getHeader = () => {
        const defaultTitle = "Something went wrong!";
        return _headerTitle?.[headerTitle as HeaderTitle] ? `${_headerTitle[headerTitle as HeaderTitle]}: ${name}` : defaultTitle
    }

    return (
        <h1 className="GenericHeader">
            {getHeader()}
        </h1>
    );
}

export default GenericHeader;