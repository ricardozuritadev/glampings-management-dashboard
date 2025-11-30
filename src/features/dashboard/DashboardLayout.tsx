import styled from "styled-components";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

// TODO: Dashboard page will be implemented later
function DashboardLayout() {
    return <StyledDashboardLayout></StyledDashboardLayout>;
}

export default DashboardLayout;
