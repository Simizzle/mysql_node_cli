require("./db/connection");
const yargs = require("yargs");
const { addUser, addMovie, updateMovie, deleteMovie, moviesList } = require("./utils/index");
const command = process.argv[2];
const user = yargs.argv.user;
const pass = yargs.argv.pass;
const title = yargs.argv.title;
const actor = yargs.argv.actor;
const watched = yargs.argv.watched;
const rating = yargs.argv.rating;
const genre = yargs.argv.genre;
const director = yargs.argv.director;

const app = () => {
    if (command === 'add user') {
        addUser(user, pass)
    } else if (command === 'add movie') {
        addMovie(title, actor, watched, rating, genre, director, user)
    } else if (command === 'update movie') {
        updateMovie(watched, rating, title, user, pass)
    } else if (command === 'delete movie') {
        deleteMovie(title, user, pass)
    } else if (command === 'list movies');
        moviesList(user, pass)
}

app();