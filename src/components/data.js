import { useState } from 'react';
import './data.css';

const Data = () => {

    const [nutritionalfacts, updatefacts] = useState();
    const [foodtype, updatefoodtype] = useState();

    async function getData(foodtype) {
    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': '93284885',
            'x-app-key': '4c93e601c73eb2920c8632fe5eab32e6'
        },
        body: JSON.stringify({
            'query': foodtype
        }),
    })
    let results = await response.json();
    updatefacts(results);
    // console.log(results.foods[0]);
    return results;
    }

    const waiting = () => {
        return(
            <h4>Waiting for input...</h4>
        )
    }

    const showNutritions = () => {
        // console.log(nutritionalfacts.foods[0]);
        let foodType = nutritionalfacts.foods[0].food_name;
        let weigth = nutritionalfacts.foods[0].serving_weight_grams;
        let calories = nutritionalfacts.foods[0].nf_calories;
        let cholesterol = nutritionalfacts.foods[0].nf_cholesterol;
        let protein = nutritionalfacts.foods[0].nf_protein;
        let fat = nutritionalfacts.foods[0].nf_total_fat;
        let carbs = nutritionalfacts.foods[0].nf_total_carbohydrate;
        return(
            <div className='facts_table'>
                <h2>Nutritional facts for {foodType} per {weigth} grams:</h2>
                <p>Calories: {calories}</p>
                <p>Fat: {fat}</p>
                <p>Carbohydrates: {carbs}</p>
                <p>Protein: {protein}</p>
                <p>Cholesterol: {cholesterol}</p>
            </div>   
        )
    }

    const handleInput = (e) => {
        updatefoodtype(e.target.value);
    }

    const handleSubmit = () => {
        getData(foodtype);
    }

    return(
        <div classname='datafield'>
            <div className='inputfield'>
                <input type='text' onChange={handleInput}></input>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </div>
            {nutritionalfacts ? showNutritions() : waiting()}
        </div>
    )
}

export default Data;
