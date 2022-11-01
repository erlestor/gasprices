import { useMutation } from "@apollo/client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CREATE_GAS_PRICE } from "../../graphql/mutations.graphql";
import styles from "./additem.module.css";

type Props = {
  id: string;
  refetch: (variables: { id: string }) => void;
};

export default function AddItem({ id, refetch }: Props) {
  const [price, setPrice] = React.useState<number | null>(null);

  const [createGasPrice, { data, loading, error }] =
    useMutation(CREATE_GAS_PRICE);
  // contains the last updated price or null if no price is updated
  const [successMessage, setSuccessMessage] = React.useState<{
    price: number | null;
    show: boolean;
  }>({ price: null, show: false });

  const addGasPrice = () => {
    createGasPrice({
      variables: {
        gasStation: id,
        price: price,
      },
    });
    if (error) {
      console.log(error);
    }
    if (loading) {
      return <AiOutlineLoading3Quarters />;
    }
    refetch({ id: id });
    setPrice(null);
    setSuccessMessage({ price: price, show: true });
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      setSuccessMessage((prev) => ({ ...prev, show: false }));
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.elementForm}>
        <div className={styles.formHeaderText}>
          <h3>Rapporter prisendring</h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addGasPrice();
          }}
        >
          <label htmlFor="price">Pris (kr/L)</label>
          <input
            required
            id="price"
            name="price"
            type="number"
            step="0.01"
            max="50"
            min="0"
            data-testid="price"
            value={price || ""}
            onChange={(event) => setPrice(parseFloat(event.target.value))}
            placeholder="ny pris"
          ></input>
          <input
            className={styles.submit}
            type="submit"
            value="Legg til ny pris"
            data-testid="submit"
          ></input>
          <h3
            className={
              styles.successMessage +
              (successMessage.show ? " " + styles.show : "")
            }
          >
            Prisen er oppdatert til {successMessage.price}
          </h3>
        </form>
      </div>
    </div>
  );
}
