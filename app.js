console.log("Let's get this party started!");

const form = document.getElementById("gif-form");
const input = document.getElementById("gif-search");
const list = document.getElementById('gif-list');

const randomInt = (limit) => Math.floor(Math.random() * limit);

const getGif = async () => {
	const res = await axios.get('http://api.giphy.com/v1/gifs/search', {
		params: {
			q: input.value,
			api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
		}
	});
	input.value = '';
	let gif = res.data.data;
	return gif[randomInt(gif.length)].images.original.url;
}

const createGif = async () => {
	if (input.value.length  < 2) return;
	const newLi = document.createElement('li')
	const newGif = document.createElement('img');
	newLi.classList.add('gif');
	newGif.src = await getGif();
	newLi.appendChild(newGif);
	list.appendChild(newLi);
}

const clearGifs = () => list.innerHTML = '';


form.addEventListener('click', async (e) => {
	e.preventDefault();
	if (e.target.id === 'gif-submit') createGif();
	else if (e.target.id === 'gif-clear') clearGifs();
	else return;
})