import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const header = "Contact Form"
    const headerDisplayed = screen.queryByText(header);
    expect(headerDisplayed).toBeInTheDocument();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)

    // const four = "aaaa"

    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, "aaaa");

    // const error = /firstName must have at least 5 characters/i

    const errorDisplayed = await screen.findByText(/firstName must have at least 5 characters/i);
        expect(errorDisplayed).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    const errorOne = (/firstName must have at least 5 characters/i)
    const errorTwo = (/lastName is a required field./i)
    const errorThree = (/email must be a valid email address./i)

    expect(firstNameInput).toHaveValue("")
    expect(lastNameInput).toHaveValue("")
    expect(emailInput).toHaveValue("")

    const button = screen.getByRole("button");
    userEvent.click(button);

    const displayedErrorOne = await screen.findByText(errorOne)
    const displayedErrorTwo = await screen.findByText(errorTwo)
    const displayedErrorThree = await screen.findByText(errorThree)

    expect(displayedErrorOne).toBeInTheDocument()
    expect(displayedErrorTwo).toBeInTheDocument()
    expect(displayedErrorThree).toBeInTheDocument()

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    const errorOne = (/firstName must have at least 5 characters/i)
    const errorTwo = (/lastName is a required field./i)
    const errorThree = (/email must be a valid email address./i)

    expect(firstNameInput).toHaveValue("")
    expect(lastNameInput).toHaveValue("")
    expect(emailInput).toHaveValue("")

    userEvent.type(firstNameInput, "abcde")
    userEvent.type(lastNameInput, "abcde")

    const button = screen.getByRole("button");
    userEvent.click(button);


    const displayedErrorOne = await screen.queryByText(errorOne)
    const displayedErrorTwo = await screen.queryByText(errorTwo)
    const displayedErrorThree = await screen.findByText(errorThree)

    expect(displayedErrorOne).not.toBeInTheDocument()
    expect(displayedErrorTwo).not.toBeInTheDocument()
    expect(displayedErrorThree).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    const errorOne = (/firstName must have at least 5 characters/i)
    const errorTwo = (/lastName is a required field./i)
    const errorThree = (/email must be a valid email address./i)

    expect(firstNameInput).toHaveValue("")
    expect(lastNameInput).toHaveValue("")
    expect(emailInput).toHaveValue("")

    userEvent.type(firstNameInput, "abcde")
    userEvent.type(lastNameInput, "abcde")
    userEvent.type(lastNameInput, "abcde")

    const button = screen.getByRole("button");
    userEvent.click(button);

    const displayedErrorOne = screen.queryByText(errorOne)
    const displayedErrorTwo = screen.queryByText(errorTwo)
    const displayedErrorThree = await screen.findByText(errorThree)

    expect(displayedErrorOne).not.toBeInTheDocument()
    expect(displayedErrorTwo).not.toBeInTheDocument()
    expect(displayedErrorThree).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    const errorOne = (/firstName must have at least 5 characters/i)
    const errorTwo = (/lastName is a required field./i)
    const errorThree = (/email must be a valid email address./i)

    expect(firstNameInput).toHaveValue("")
    expect(lastNameInput).toHaveValue("")
    expect(emailInput).toHaveValue("")

    userEvent.type(firstNameInput, "abcde")
    userEvent.type(emailInput, "abcde@assad.asdas")

    const button = screen.getByRole("button");
    userEvent.click(button);

    const displayedErrorOne = screen.queryByText(errorOne)
    const displayedErrorTwo = await screen.findByText(errorTwo)
    const displayedErrorThree = screen.queryByText(errorThree)

    expect(displayedErrorOne).not.toBeInTheDocument()
    expect(displayedErrorTwo).toBeInTheDocument()
    expect(displayedErrorThree).not.toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    expect(firstNameInput).toHaveValue("")
    expect(lastNameInput).toHaveValue("")
    expect(emailInput).toHaveValue("")

    userEvent.type(firstNameInput, "abcde")
    userEvent.type(lastNameInput, "abcde")
    userEvent.type(lastNameInput, "abcde@ab.cd")

    const button = screen.getByRole("button");
    userEvent.click(button);

    const displayedMessage = screen.queryByTestId("messageDisplay")

    expect(displayedMessage).not.toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);

    expect(firstNameInput).toHaveValue("")
    expect(lastNameInput).toHaveValue("")
    expect(emailInput).toHaveValue("")
    expect(messageInput).toHaveValue("")

    userEvent.type(firstNameInput, "abcde")
    userEvent.type(lastNameInput, "abcde")
    userEvent.type(emailInput, "abcde@ab.cd")
    userEvent.type(messageInput, "asdasdasd")

    const button = screen.getByRole("button");
    userEvent.click(button);

    const displayedMessageOne = await screen.findByTestId("firstnameDisplay")
    const displayedMessageTwo = await screen.findByTestId("lastnameDisplay")
    const displayedMessageThree = await screen.findByTestId("emailDisplay")
    const displayedMessageFour = await screen.findByTestId("messageDisplay")

    expect(displayedMessageOne).toBeInTheDocument()
    expect(displayedMessageTwo).toBeInTheDocument()
    expect(displayedMessageThree).toBeInTheDocument()
    expect(displayedMessageFour).toBeInTheDocument()

    console.log(displayedMessageOne)
});