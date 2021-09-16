const errorText=document.getElementById('error-text');
const spinner = document.getElementById('spinner');
const keypress=(event)=>{
    if(event.key === 'Enter'){
        document.getElementById('search-btn').click();
    }
}
const getInput=()=>{
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    // console.log(inputValue);
    if(inputValue===''){
        errorText.innerHTML=`
            <h3>Search Field Cannot Be Empty</h3>
        `
        document.getElementById('card-div').textContent='';
    }else{
        spinner.classList.remove('d-none');
        document.getElementById('card-div').textContent='';
        fetchData(inputValue)
    }
    
    input.value='';
}

const fetchData=name=>{
    errorText.textContent='';
    fetch(`https://api.genderize.io/?name=${name}`)
    .then(res => res.json())
    .then(data => {
        spinner.classList.add('d-none')
        const cardDiv = document.getElementById('card-div');
        if(data.gender === null){
            errorText.innerHTML=`<h3>Enter Valid Name</h3>`
            cardDiv.textContent='';
            spinner.classList.add('d-none')
        }else{
        cardDiv.innerHTML+=`
        <div class="card-header">Details</div>
        <div class="card-body">
        <h5 class="card-title">Name : ${data.name}</h5>
        <p class="card-text">
          Gender : ${data.gender} <br>
          probability : ${data.probability}
        </p>
        `
        }
    })
}
