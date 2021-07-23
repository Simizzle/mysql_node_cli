const sql = require("../db/connection");

exports.addUser = (username, pass) => {
  // node src/app.js "add user" --user "MichaelJ" --pass "shamone" //
  const user = [pass, username];
  try {
    sql.query("INSERT INTO users SET username = ?", user);
    sql.query(
      "INSERT INTO passwords SET pass = ?, userID = (SELECT id FROM users WHERE username = ?)",
      user
    );
  } catch (error) {
    console.log(error);
  }
};

exports.addMovie = (
  title,
  actor,
  watched,
  rating,
  genre,
  director,
  username
) => {
  const movies = [title, actor, watched, rating, genre, director, username];
  try {
    sql.query(
      "INSERT INTO movies SET title = ?, actor = ?, watched = ?, rating = ?, genre = ?, director = ?, userID = (SELECT id FROM users WHERE username = ?)",
      movies
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateMovie = (watched, rating, title, user, pass) => { // node src/app.js "update movie" --watched "true"  --rating 5 --title "Star Wars"  --user "LucyW" --pass "test456" //
  const update = [watched, rating, title, user, pass];
  try {
    sql.query(
      "UPDATE movies SET watched = ?, rating = ? WHERE title = ? AND userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)",
      update
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMovie = (title, user, pass) => { // node src/app.js "delete movie"  --title "Titanic"  --user "SimonM" --pass "test123" //
  const remove = [title, user, pass];
  try {
    sql.query(
      "DELETE from movies WHERE title = ? AND userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)",
      remove
    );
  } catch (error) {
    console.log(error);
  }
};

exports.moviesList = async (username, pass) => {
    console.log(username, pass)
    try {
        const user = [username, pass];
        sql.query("SELECT title, actor, watched, rating, genre, director FROM movies WHERE userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)", user, (error, results) => {
            if (error) {console.error(error);
            } console.log(results)})
    } catch (error) {
        console.log(error)
    }
}

// exports.moviesList = () => {
//     sql.query("SELECT * FROM movies", (error, result) => {
//         if (error) {
//             console.log(error);
//         } console.log(result);
//         connection.end();
//     })
// };