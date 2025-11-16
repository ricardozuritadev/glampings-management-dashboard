import styled from "styled-components";
import { format, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";

import { formatCurrency } from "@/utils/helpers";
import { formatDistanceFromNow } from "@/utils/helpers";
import { PAGES } from "@/constants/pages.constants";
import type { Booking } from "@/types/features/booking.types";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

const MenuButton = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

type BookingRowProps = {
    booking: Booking;
};

function BookingRow({ booking }: BookingRowProps) {
    const {
        id,
        startDate,
        endDate,
        numNights,
        totalPrice,
        status,
        guests,
        glampings
    } = booking;

    const navigate = useNavigate();

    const statusToTagName: Record<string, "blue" | "green" | "silver"> = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver"
    };

    const statusToLabel: Record<string, string> = {
        unconfirmed: PAGES.BOOKINGS.STATUS.UNCONFIRMED,
        "checked-in": PAGES.BOOKINGS.STATUS.CHECKED_IN,
        "checked-out": PAGES.BOOKINGS.STATUS.CHECKED_OUT
    };

    if (!startDate || !endDate || !numNights || !totalPrice || !status) {
        return null;
    }

    const guestName = guests?.fullName || "Desconocido";
    const email = guests?.email || "";
    const glampingName = glampings?.name || "Desconocido";

    return (
        <Table.Row>
            <Cabin>{glampingName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? PAGES.BOOKINGS.ROW.TODAY
                        : `${PAGES.BOOKINGS.ROW.STARTS_IN} ${formatDistanceFromNow(startDate)}`}{" "}
                    &bull; {numNights}{" "}
                    {numNights === 1
                        ? PAGES.BOOKINGS.ROW.NIGHT_STAY
                        : PAGES.BOOKINGS.ROW.NIGHTS_STAY}
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy", { locale: es })}{" "}
                    &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy", { locale: es })}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status] || "blue"}>
                {statusToLabel[status] || status.replace("-", " ")}
            </Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <MenuButton onClick={() => navigate(`/bookings/${id}`)}>
                <HiArrowDownOnSquare />
            </MenuButton>
        </Table.Row>
    );
}

export default BookingRow;
