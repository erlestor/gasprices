import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";

import {GasStationPage} from "../Components/gasStationPage/GasStationPage"
import AddItem from '../Components/addItem/AddItem';

it("should render without error", () => {
    render (
        <MockedProvider mocks={[]}>
            <AddItem id='1' refetch={null as any} />
        </MockedProvider>
    );
});
