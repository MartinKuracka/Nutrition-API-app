import { useEffect } from 'react';

const Data = () => {

    useEffect(() => {getData()}, []);

    async function getData() {
    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': '93284885',
            'x-app-key': '4c93e601c73eb2920c8632fe5eab32e6'
        },
        body: JSON.stringify({
            'query': 'eggs'
        }),
    })
    const results = await response.json();
    console.log(results)
    }

    return(
        <div>
            Data
        </div>
    )
}

export default Data;
