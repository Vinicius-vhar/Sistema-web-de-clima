import {useState} from 'react';

function Search(props){
    
    const [cidade,setCidade] = useState("");

    function searchInput(e){
        e.preventDefault();
        
        let currentValue = document.querySelector('input[name=searchInput]')
        .value;
        
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=f3e8f6b458a53234d8e5ff0d41c36300&units=metric`;
        fetch(url)
        .then(response=> response.json())
        .then(data=>{
            
            const {main, name, sys, weather} = data;
            if(sys != undefined){
                
            if(weather != undefined){
                
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
             weather[0]["icon"]}.svg`;
                setCidade(`
                <div class="containerCidade">
                <p>Temperatura: ${main.temp}</p>
                <p>País: ${sys.country}</p>
                <p>Cidade: ${name}</p>
                <p>${weather[0]['description']}</p>
                <img src="${icon}" />
                </div>
                `);

            }

            }else{
                setCidade("");
            }
        })
    
    }

    return(
        <div className="searchWraper">
        <div className="search">
            <h2>Digite a cidade que desejar saber sobre o "Clima"</h2>
            <form onSubmit={(e)=>searchInput(e)}>
            <input placeholder={props.placeholder}  type="text" name="searchInput" />
            <input type="submit" value="Pesquisar por cidade!" />
            </form>
           
        </div>

        {
            (cidade!= "")?
            <div dangerouslySetInnerHTML={{__html: cidade}} />:
            <div style={{padding:'8px'}}>Pesquise pela cidade que tem interrese de saber as informações a seguir "Temperatura e o clima"</div>
        }

        </div>
    )
}

export default Search;