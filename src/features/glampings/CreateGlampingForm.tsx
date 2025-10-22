import styled from "styled-components";

import { useForm, type FieldValues } from "react-hook-form";

import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FileInput from "@/ui/FileInput";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateGlampingForm() {
    const { register, handleSubmit } = useForm();

    function onSubmit(data: FieldValues) {
        console.log(data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="name">{PAGES.GLAMPINGS.FORM.NAME}</Label>
                <Input type="text" id="name" {...register("name")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">{PAGES.GLAMPINGS.FORM.CAPACITY}</Label>
                <Input
                    type="number"
                    id="maxCapacity"
                    defaultValue={4}
                    {...register("maxCapacity")}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="weekdayPrice">{PAGES.GLAMPINGS.FORM.WEEKDAY_PRICE}</Label>
                <Input type="number" id="weekdayPrice" {...register("weekdayPrice")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="fridayPrice">{PAGES.GLAMPINGS.FORM.FRIDAY_PRICE}</Label>
                <Input type="number" id="fridayPrice" {...register("fridayPrice")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="saturdayPrice">{PAGES.GLAMPINGS.FORM.SATURDAY_PRICE}</Label>
                <Input type="number" id="saturdayPrice" {...register("saturdayPrice")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">{PAGES.GLAMPINGS.FORM.DESCRIPTION}</Label>
                <Textarea id="description" defaultValue="" {...register("description")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">{PAGES.GLAMPINGS.FORM.IMAGE}</Label>
                <FileInput id="image" accept="image/*" {...register("image")} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    {PAGES.GLAMPINGS.FORM.CANCEL}
                </Button>
                <Button>{PAGES.GLAMPINGS.FORM.EDIT}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateGlampingForm;
