import React from 'react';
import styles from './newelementmain.module.css'

export default function NewElementMain() {

  return (
    <div className={styles.wrapper}>
        <div className={styles.elementForm}>
            <div className={styles.formHeaderText}>
                <h3>Add new element</h3>
            </div>
            <form>
                <label htmlFor='name'>Navn</label>
                <input id="name" name="name"></input>
                <label htmlFor='price'>Pris (kr)</label>
                <input id="price" name="price"></input>
                <label htmlFor='area'>Område</label>
                <select id="area" name="area">
                    <option value="" selected disabled hidden>Velg område</option>
                    <option value="agder">Agder</option>
                    <option value="moreogromsdal">Møre og romsdal</option>
                    <option value="nordland">Nordland</option>
                    <option value="oslo">Oslo</option> 
                    <option value="rogaland">Rogaland</option>
                    <option value="svalbard">Svalbard</option>
                    <option value="tromsogfinnmark">Troms og finnmark</option>
                    <option value="trondelag">Trøndelag</option>
                    <option value="vestfoldogtelemark">Vestfold og telemark</option>
                    <option value="vestland">Vestland</option>
                    <option value="viken">Viken</option>
                </select>
                <div>
                    <input className={styles.radioButton} type="radio" id="new"
                    name="state" value="new"/>
                </div>
                <label className={styles.radioLabel}htmlFor="new">Ny</label>
                <div>
                    <input className={styles.radioButton} type="radio" id="used"
                    name="state" value="used"/>
                </div>
                <label className={styles.radioLabel} htmlFor="used">Brukt</label>
                <label htmlFor='description'>Beskrivelse</label> 
                <textarea id="description" name="description"></textarea>
                <input className={styles.submit} type="submit" value="Submit"></input>
            </form>
        </div>
    </div>
  );
}