let moviesContainer=document.getElementById('moviesContainer');
const apiKey='1f725049b6e59cca53d5da96c230f9b6';
const apiUrl=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
let serachBtn=document.getElementById('searchButton');
let searchInput=document.getElementById('searchInput');
let trendingBtn=document.getElementById('trendingBtn');
let popularBtn=document.getElementById('popularBtn');
let nowBtn=document.getElementById('nowBtn');
let loader = document.querySelector('.loader'); 



// function fetchMovies(query) {
//     fetch(API_URL + query)
//         .then(response => response.json())
//         .then(data => displayMovies(data.results))
//         .catch(error => console.error("حدث خطأ:", error));
// }





    function showLoader() {
loader.classList.add('show')
    }


function hideLoader(){
// document.querySelector('.loader')?.remove();
loader?.remove();


}







// Function to fetch movies
function fetchMovies(query){
showLoader();
fetch(apiUrl+query).then(response=>response.json()).then(data=>displayMovies(data.results)).catch(error=>console.log('Error')
).finally(function(){
    hideLoader();
})



}


// function handleSearch(){
//     const query=document.getElementById('searchInput').value;
//     if(query !==""){
//     fetchMovies(query);
//     }



// }

// Function to handle search
function handleSearch(){
const query=searchInput.value;
if(query!==""){
    fetchMovies(query)

}


}

// Enter in searvhInput
searchInput.addEventListener('keydown',function(event){
    if(event.key=="Enter"){
    handleSearch();
    }
    
    })
    



//SearchBTn Click

serachBtn.addEventListener('click',function(){
    const query=document.getElementById('searchInput').value;
    if (query!=""){

        handleSearch();
    }
})



// Function To Display Movies

function displayMovies(movies=[]){

moviesContainer.innerHTML="";
for(let i=0;i<movies.length;i++){




    const movie=movies[i];
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';




    const movieCard=`

    <div class="col-md-2">
    <div class="card">
    <img src="https://image.tmdb.org/t/p/w500${posterPath}" class="card-img-top mb-3" alt="${movie.title}">
    <div class="card-body">
    
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.release_date}</p>
    
    
    
    </div>
    
    
    </div>
    
    
    </div>
    
    
    
    
    `
console.log(movies);

    
    moviesContainer.innerHTML +=movieCard;
}





}


function fetchCategory(category){
    showLoader();
    const apiUrl2 = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;



fetch(apiUrl2).then(response => response.json())
.then(data => displayMovies(data.results))
.catch(error => console.error("There is an Error:", error)).finally(()=>{

hideLoader();

})






}


trendingBtn.addEventListener('click',function(){
    fetchCategory('top_rated')
}),
popularBtn.addEventListener('click',function(){
fetchCategory('popular')

}),
nowBtn.addEventListener('click',function(){

fetchCategory('now_playing')

})



window.onload=function(){
    showLoader(),
      setTimeout(function(){
        fetchCategory('popular')
      },2000)
    }
    // window.onload = function () {
    //     fetchCategory('popular');
    // };



