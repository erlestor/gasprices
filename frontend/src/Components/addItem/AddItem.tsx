import { useMutation } from "@apollo/client"
import React from "react"
import { CREATE_GAS_PRICE } from "../../graphql/mutations.graphql"
import styles from "./additem.module.css"

export default function AddItem(stationName: any, id: any) {
  const [price, setPrice] = React.useState<number | null>(null)

  const [createGasPrice, { data, loading, error }] = useMutation(CREATE_GAS_PRICE)

  const addGasPrice = () => {
    createGasPrice({
      variables: {
        gasStation: id.id,
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
          <h3>Add new price to {stationName.stationName}</h3>
        </div>

        <form
          onSubmit={e => {
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
            onChange={event => setPrice(parseFloat(event.target.value))}
          ></input>
          <input className={styles.submit} type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  )
}
