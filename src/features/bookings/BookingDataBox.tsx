import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
    HiOutlineHomeModern
} from "react-icons/hi2";

import DataItem from "@/ui/DataItem";
import { Flag } from "@/ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { PAGES } from "@/constants/pages.constants";
import type { Booking } from "@/types/features/booking.types";

const StyledBookingDataBox = styled.section`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    overflow: hidden;
`;

const Header = styled.header`
    background-color: var(--color-brand-500);
    padding: 2rem 4rem;
    color: #e0e7ff;
    font-size: 1.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
        height: 3.2rem;
        width: 3.2rem;
    }

    & div:first-child {
        display: flex;
        align-items: center;
        gap: 1.6rem;
        font-weight: 600;
        font-size: 1.8rem;
    }

    & span {
        font-family: "Sono";
        font-size: 2rem;
        margin-left: 4px;
    }
`;

const Section = styled.section`
    padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.6rem;
    color: var(--color-grey-500);

    & p:first-of-type {
        font-weight: 500;
        color: var(--color-grey-700);
    }
`;

const Price = styled.div<{ isPaid: boolean | null }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 3.2rem;
    border-radius: var(--border-radius-sm);
    margin-top: 2.4rem;

    background-color: ${(props) =>
        props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
    color: ${(props) =>
        props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

    & p:last-child {
        text-transform: uppercase;
        font-size: 1.4rem;
        font-weight: 600;
    }

    svg {
        height: 2.4rem;
        width: 2.4rem;
        color: currentColor !important;
    }
`;

const Footer = styled.footer`
    padding: 1.6rem 4rem;
    font-size: 1.2rem;
    color: var(--color-grey-500);
    text-align: right;
`;

type BookingDataBoxProps = {
    booking: Booking;
};

// A purely presentational component
function BookingDataBox({ booking }: BookingDataBoxProps) {
    const {
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        observations,
        isPaid,
        guests,
        glampings
    } = booking;

    if (!startDate || !endDate || !numNights || !totalPrice) {
        return null;
    }

    const guestName = guests?.fullName || "Desconocido";
    const email = guests?.email || "";
    const country = guests?.nationality || "";
    const countryFlag = guests?.countryFlag || null;
    const nationalID = guests?.nationalID || "";
    const glampingName = glampings?.name || "Desconocido";

    // Calculate prices (assuming we need to derive these from totalPrice)
    const cabinPrice = totalPrice;
    const extrasPrice = 0;
    const hasBreakfast = false;

    return (
        <StyledBookingDataBox>
            <Header>
                <div>
                    <HiOutlineHomeModern />
                    <p>
                        {PAGES.BOOKINGS.DATA_BOX.NIGHTS_IN_GLAMPING.replace(
                            "{nights}",
                            String(numNights)
                        )}{" "}
                        <span>{glampingName}</span>
                    </p>
                </div>

                <p>
                    {format(new Date(startDate), "EEE, MMM dd yyyy")} (
                    {isToday(new Date(startDate))
                        ? PAGES.BOOKINGS.DATA_BOX.TODAY
                        : formatDistanceFromNow(startDate)}
                    ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
                </p>
            </Header>

            <Section>
                <Guest>
                    {countryFlag && (
                        <Flag src={countryFlag} alt={`Flag of ${country}`} />
                    )}
                    <p>
                        {guestName}{" "}
                        {numGuests && numGuests > 1
                            ? `+ ${numGuests - 1} ${PAGES.BOOKINGS.DATA_BOX.GUESTS}`
                            : ""}
                    </p>
                    <span>&bull;</span>
                    <p>{email}</p>
                    <span>&bull;</span>
                    <p>
                        {PAGES.BOOKINGS.DATA_BOX.NATIONAL_ID} {nationalID}
                    </p>
                </Guest>

                {observations && (
                    <DataItem
                        icon={<HiOutlineChatBubbleBottomCenterText />}
                        label={PAGES.BOOKINGS.DATA_BOX.OBSERVATIONS}
                    >
                        {observations}
                    </DataItem>
                )}

                <DataItem
                    icon={<HiOutlineCheckCircle />}
                    label={PAGES.BOOKINGS.DATA_BOX.BREAKFAST_INCLUDED}
                >
                    {hasBreakfast
                        ? PAGES.BOOKINGS.DATA_BOX.YES
                        : PAGES.BOOKINGS.DATA_BOX.NO}
                </DataItem>

                <Price isPaid={isPaid}>
                    <DataItem
                        icon={<HiOutlineCurrencyDollar />}
                        label={PAGES.BOOKINGS.DATA_BOX.TOTAL_PRICE}
                    >
                        {formatCurrency(totalPrice)}

                        {hasBreakfast &&
                            ` (${formatCurrency(cabinPrice)} ${PAGES.BOOKINGS.DATA_BOX.CABIN} + ${formatCurrency(
                                extrasPrice
                            )} ${PAGES.BOOKINGS.DATA_BOX.BREAKFAST})`}
                    </DataItem>

                    <p>
                        {isPaid
                            ? PAGES.BOOKINGS.DATA_BOX.PAID
                            : PAGES.BOOKINGS.DATA_BOX.WILL_PAY_AT_PROPERTY}
                    </p>
                </Price>
            </Section>

            <Footer>
                <p>
                    {PAGES.BOOKINGS.DATA_BOX.BOOKED}{" "}
                    {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
                </p>
            </Footer>
        </StyledBookingDataBox>
    );
}

export default BookingDataBox;
