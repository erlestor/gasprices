import React from "react"
import styles from "./additem.module.css"
import { CREATE_GAS_PRICE } from "../../graphql/mutations"
import { useMutation } from "@apollo/client"

export default function AddItem() {
  const [price, setPrice] = React.useState<number | null>(null)

  //Temporary!!:
  const [gasStationId, setGasStationId] = React.useState(
    "634fb2df84b8735fd91bab08"
  )

  const [createGasPrice, { data, loading, error }] =
    useMutation(CREATE_GAS_PRICE)

  const addGasPrice = () => {
    createGasPrice({
      variables: {
        gasStation: gasStationId,
        price: price,
      },
    })
    if (error) {
      console.log(error)
    }
    if (loading) {
      return <p>Loading...</p>
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.elementForm}>
        <div className={styles.formHeaderText}>
          <h3>Add new price to "Add prop"</h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            addGasPrice()
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
          <input className={styles.submit} type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  )
}
