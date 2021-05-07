import { useState } from 'react';
import './data.css';

const Data = () => {

    const [nutritionalfacts, updatefacts] = useState();
    const [foodtype, updatefoodtype] = useState();
    const [coeficient, setCoeficient] = useState(1);

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
        setCoeficient(100/results.foods[0].serving_weight_grams);
    }

    const waiting = () => {
        return(
            <h4>Waiting for input...</h4>
        )
    }

    const showNutritions = () => {
        console.log(nutritionalfacts.foods[0]);
        const {food_name, nf_calories, nf_cholesterol, nf_protein, nf_total_fat, nf_total_carbohydrate, photo } = nutritionalfacts.foods[0];        
        let foodType = food_name;
        let calories = Math.floor(nf_calories*coeficient*10)/10;
        let cholesterol = Math.floor(nf_cholesterol*coeficient*10)/10;
        let protein = Math.floor(nf_protein*coeficient*10)/10;
        let fat = Math.floor(nf_total_fat*coeficient*10)/10;
        let carbs = Math.floor(nf_total_carbohydrate*coeficient*10)/10;
        let image = photo.highres;
        return(
            <>
            <div className='container'>
                <div className='facts_table'>
                    <h2>Nutritional facts for {foodType} per 100 grams:</h2>
                    <div className='w-60'>
                        <div className='initial_p nutrition-line-text'>
                            <p>Calories:</p>
                            <p>{calories}</p>
                        </div>
                        <div className='nutrition-line-text'>
                            <p>Fat:</p>
                            <p>{fat}</p>
                        </div>
                        <div className='nutrition-line-text'>
                            <p>Carbohydrates:</p>
                            <p>{carbs}</p>
                        </div>
                        <div className='nutrition-line-text'>
                            <p>Protein:</p>
                            <p>{protein}</p>
                        </div>
                        <div className='nutrition-line-text'>
                            <p>Cholesterol:</p>
                            <p>{cholesterol}</p>
                        </div>
                    </div>
                </div>
                <div className='image-cont'>
                  <img src={image} />
                </div>
            </div>
            </>
        )
    }

    const handleInput = (e) => {
        updatefoodtype(e.target.value);
    }

    const handleSubmit = () => {
        getData(foodtype);
    }

    return(
        <div className='datafield'>
            <div className='inputfield'>
                <input type='text' onChange={handleInput} autoFocus/>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </div>
            {nutritionalfacts ? showNutritions() : waiting()}
        </div>
    )
}

export default Data;
