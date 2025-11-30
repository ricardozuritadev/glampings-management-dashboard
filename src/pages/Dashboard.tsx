import { PAGES } from "@/constants/pages.constants";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

export default function Dashboard() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">{PAGES.DASHBOARD.HEADER}</Heading>
            </Row>

            <DashboardLayout />
        </>
    );
}
