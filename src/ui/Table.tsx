import { createContext, useContext, type ReactNode } from "react";
import styled from "styled-components";

const StyledTable = styled.div<TableProps>`
    border: 1px solid var(--color-grey-200);
    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

const CommonRow = styled.div<TableProps>`
    display: grid;
    grid-template-columns: ${(props) => props.columns};
    column-gap: 2.4rem;
    align-items: center;
    transition: none;
`;

const StyledHeader = styled(CommonRow)<TableProps>`
    padding: 1.6rem 2.4rem;
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)<TableProps>`
    padding: 1.2rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledBody = styled.section<TableProps>`
    margin: 0.4rem 0;
`;

const Footer = styled.footer<TableProps>`
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    padding: 1.2rem;

    /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
    &:not(:has(*)) {
        display: none;
    }
`;

const Empty = styled.p<TableProps>`
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    margin: 2.4rem;
`;

type TableProps = {
    columns?: string;
    children: React.ReactNode;
};

type TableContextValue = {
    columns?: string;
};

type BodyProps = {
    data: unknown[];
    render: (item: unknown) => ReactNode;
};

const TableContext = createContext<TableContextValue | undefined>(undefined);

function useTable() {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error(
            "Table compound components must be used inside <Table />"
        );
    }

    return context;
}

function Table({ columns, children }: TableProps) {
    return (
        <TableContext.Provider value={{ columns }}>
            <StyledTable columns={columns} role="table">
                {children}
            </StyledTable>
        </TableContext.Provider>
    );
}

function Header({ children }: TableProps) {
    const { columns } = useTable();

    return (
        <StyledHeader role="row" as="header" columns={columns}>
            {children}
        </StyledHeader>
    );
}

function Row({ children }: TableProps) {
    const { columns } = useTable();

    return <StyledRow columns={columns}>{children}</StyledRow>;
}

function Body({ data, render }: BodyProps) {
    if (!data) return <Empty>No data to display</Empty>;

    return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
