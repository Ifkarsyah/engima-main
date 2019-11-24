export const MovieDbAPI = {
  apiKey : "8ac99eb14b097c022b53c57e4139315e",
  baseUrl: "https://api.themoviedb.org/3",
  baseUrlImage: "https://image.tmdb.org/t/p/w154",
};

export async function moviedb_GetMovieDetail(movieId) {
  const totalUrl = MovieDbAPI.baseUrl + '/movie/' + movieId + `?api_key=${MovieDbAPI.apiKey}`;
  const response = await fetch(totalUrl);
  return await response.json();
}