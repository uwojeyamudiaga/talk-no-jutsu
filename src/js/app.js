import UI from "./UI/UI";
import { API_ENDPOINT } from "./config";
import { fetchQuote } from "./helper";
import { manga } from "./state";
import Spinner from "./components/spinner";
import Modal from "./components/modal";

const ui = new UI();
const spinner = new Spinner();
const modal = new Modal();

//TODO: add a DOMContentLoaded event to fetch a random quote initially
window.addEventListener("DOMContentLoaded", () => {
	console.log("loaded");
});

//navigate sidebar tabs
ui.navigate();

//fetch random quotes
const fetchRandomQuote = async () => {
	try {
		const quote = await fetchQuote(API_ENDPOINT());
		if (!quote.ok) throw new Error(quote.statusText);
		const data = await quote.json();
		const [randomQuote] = manga.quotes.concat(data);
		ui.render(randomQuote);
	} catch (error) {
		//handle error
		console.error(error);
	} finally {
		//hide spinner
	}
};

//fetch random quote
ui.getRandomQuote(fetchRandomQuote);

spinner.show();
