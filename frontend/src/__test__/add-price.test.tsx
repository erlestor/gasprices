import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";

import {GasStationPage} from "../Components/gasStationPage/GasStationPage"

it("should render without error", () => {
    render (
        <MockedProvider mocks={[]}>
            <GasStationPage />
        </MockedProvider>
    );
});
