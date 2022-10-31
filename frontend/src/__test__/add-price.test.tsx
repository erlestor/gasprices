import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";

import {GasStationPage} from '../Components/gasStationPage/GasStationPage';
import AddItem from '../Components/addItem/AddItem';
import { CREATE_GAS_PRICE } from '../graphql/mutations.graphql';

it("should find loading and updated price", () => {
    
    const price = {gasStationId: "635cfcafe0c44e3883108e14", price: 15}
    const mocks = [
        {
            request: {
                query: CREATE_GAS_PRICE,
                variables: {
                    gasStation: price.gasStationId,
                    price: price.price,
                },
            },
            result: { data: price }
        }
    ];


    render (
        <MockedProvider mocks={mocks}>
            <AddItem id={price.gasStationId} refetch={() => {}}/>
        </MockedProvider>
    );

    const priceInput = screen.getByPlaceholderText("ny pris");
    userEvent.type(priceInput, "15");
    const submitButton = screen.getByText("Legg til ny pris");
    userEvent.click(submitButton);

    // expect to have loading icon
    /*
    TODO: Check for the loading data.
    No way to check in the DOM for the data,
    */
});


