import GlobalStyles from "./styles/GlobalStyles";
import Heading from "@/ui/Heading";
import Row from "./ui/Row";
import Button from "./ui/Button";

function App() {
    return (
        <>
            <GlobalStyles />
            <Row>
                <Heading>Hello World</Heading>
                <Button size="large" variation="danger">
                    Test 1
                </Button>
            </Row>

            <Row type="vertical">
                <Button size="small" variation="secondary">
                    Test 2
                </Button>
                <Button>Test 3</Button>
            </Row>
        </>
    );
}

export default App;
