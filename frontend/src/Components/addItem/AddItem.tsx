import { useMutation } from "@apollo/client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CREATE_GAS_PRICE } from "../../graphql/mutations.graphql";
import styles from "./additem.module.css";

type Props = {
  id: string;
};

export default function AddItem({ id }: Props) {
  const [price, setPrice] = React.useState<number | null>(null);

  const [createGasPrice, { data, loading, error }] =
    useMutation(CREATE_GAS_PRICE);

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
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.elementForm}>
        <div className={styles.formHeaderText}>
          <h3>Legg til ny pris til stasjonen</h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addGasPrice();
          }}
        >
          <label htmlFor="price">Pris (kr)</label>
          <input
            id="price"
            name="price"
            type="number"
            value={price ?? ""}
            onChange={(event) => setPrice(parseFloat(event.target.value))}
          ></input>
          <input
            className={styles.submit}
            type="submit"
            value="Legg til ny pris"
          ></input>
        </form>
      </div>
    </div>
  );
}
