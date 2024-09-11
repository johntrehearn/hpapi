const potterDisplay = document.querySelector('.displayResults');
const groupButtons = document.querySelectorAll('.btn');
const searchBar = document.getElementById('searchbar');

let potterData = [];

let groupData = 'characters';

const fetchData = async () => {
    await fetch(`http://hp-api.herokuapp.com/api/${groupData}`)
    .then(res => res.json())
    .then((data) => {
        console.log(data); 

        const fetches = data.map((item) => {
            return {
                name: item.name,
                img: item.image,
                anscestry: item.ancestry,
                house: item.house,
                wand: {
                    wood: item.wand.wood,
                    core: item.wand.core,
                    length: item.wand.length
                },
                patronus: item.patronus,
            };
    });
      
    potterData = fetches;
    potterCards('');

    });
};

const toSentenceCase = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const potterCards = (searchString) => {
    const cards = potterData
    .filter((data) => {
        return data.name.toLowerCase().includes(searchString);
    })
    .map((data) => {
        return `<div class="card">
          <div>
            <img src="${data.img}" alt="${data.name}"/>
           </div>
            <div>
        <p class="description"> Name: ${data.name ? toSentenceCase(data.name) : 'None'} </p>
        <p class="description"> Ancestry: ${data.anscestry ? toSentenceCase(data.anscestry) : 'None'} </p>
        <p class="description"> House: ${data.house ? toSentenceCase(data.house) : 'None'} </p>
        <p class="description"> Wand: ${data.wand.wood ? toSentenceCase(data.wand.wood) : 'None'} ${data.wand.core ? toSentenceCase(data.wand.core) : ''} ${data.wand.length ? data.wand.length + ' inches' : ''} </p>
        <p class="description"> Patronus: ${data.patronus ? toSentenceCase(data.patronus) : 'None'} </p>
        </div>
        </div>`;
    })
    .join('');
    potterDisplay.innerHTML = cards;
};

fetchData();