const recipeForm=document.querySelector('#query-form')
const query=document.querySelector('#ingredients')
const numberq=document.querySelector('#contains')
const loationpara=document.querySelector('#locationpara')
const currentpara=document.querySelector('#currentpara')
const forecastpara=document.querySelector('#forecastpara')
const datepara=document.querySelector('#datepara')


recipeForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    // console.log('SEcond')
    loationpara.textContent='Loading...'
    currentpara.textContent=''
    forecastpara.textContent=''
    // console.log('query'+query.value,numberq.value)
    const data={
        queries:query.value,
        numberq:numberq.value
    }
    fetch('/recipe',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:await JSON.stringify(data)
    }).then((response)=>{
      //  console.log(response)
        response.json().then((data)=>{
            formatSearchResults(data)
        })
     }).catch((error)=>{
        loationpara.textContent="Unable to access recipe services right Now. Please try again later."
     })
})


// These website no longer work but are still returned by the recipe puppy

var defunctDomains = [
    "kraftfoods.com",
    "cookeatshare.com",
    "find.myrecipes.com"
  ];
  
  // This function checks to see if a URL contains the domain of any of the
  // defunctDomains above
  
  function isADefunctSite(sampleSite) {
  
    var found = false;
  
    defunctDomains.forEach(
      function (item, index) {
        if (sampleSite.includes(item)) { found = true; }
      }
    );
  
    return found;
  
  }
  
  // This function turns the results that is returned into HTML elements
  // to display on the web page
  
  function formatSearchResults(jsonResults) {
  
    var jsonObject = jsonResults;
    var siteCount = 0;
    // console.log(jsonObject)
    if (jsonObject.recipes.length == 0) {
      setNotFoundMessages();
    }
    
    else {
  
     loationpara.textContent="Search Results";
      var formatedText = "";
  
      jsonObject.recipes.forEach(
        function(recipe, index) {
  
          if (isADefunctSite(recipe.sourceUrl)) { return; }
  
          siteCount++;
  
          var thumbnail = 'https://spoonacular.com/recipeImages/';
          thumbnail+=recipe.id+'-240x150.jpg'
          if (thumbnail == "") { thumbnail = "images/generic_dish.jpg"; }
  
          const href = recipe.sourceUrl;
          formatedText +=`<div class="uk-width-1-3@m uk-width-1-2@s uk-width-1-1 uk-text-center"><div class="uk-card uk-card-default"><div class="uk-card-media-top"><a href="${thumbnail}"><img src="${thumbnail}" width="150" alt="recipe pic"></a></div><div class="uk-card-body"><h3 class="uk-card-title"><a href="${href}" target="_blank">${recipe.title}</a> </h3><p>Cooking Time : ${recipe.readyInMinutes}</p><p>Serving : ${recipe.servings}</p></div></div></div>`
        //   formatedText += "<div class='dish-image-div'><a " + " href='" + href + "' target='_blank'><img class='dish-image' style='inline' width='80' src='" + thumbnail + "' alt='recipe picture, link to recipe page'></a></div>";
        //   formatedText += "<div " + "class='dish-title-div'><a href='" + href + "' target='_blank'>" + recipe.title + "</a></div>";
        //   formatedText += "<div class='dish-ingredients-div'>Cooking Time: " + recipe.readyInMinutes + "</div>"; 
        }
      );
  
      if (siteCount > 0) {
        loationpara.innerHTML=formatedText;
      }
      else {
        setNotFoundMessages();
      }
    }
  
  }
  
  function setNotFoundMessages() {
    currentpara.textContent='No recipes found, please change search criteria.';
  }

  //get Cookie function
var getCookie=async function getCookie(cname) {
  var name = cname + "=";
  
  const response =await fetch('/serveCookie',{
      method:'POST'
  })
  const res=await response.json()
  var decodedCookies=JSON.stringify(res.userData)
  decodedCookies="userData=j:"+decodedCookies
  var ca = decodedCookies.split(';');
  decodedCookies=""
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Hiding Login/SignUp buttons
var LoginButton=async function LoginButton() {
  var isLoggedIn =await (await fetch('/loginstatus',{
     method:'POST'
  })).json()
  // console.log(isLoggedIn)
  if (!isLoggedIn) {
    // console.log('Why the hell')
    var all = document.getElementsByClassName('LoginPageButton');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = '';
    }
    all = document.getElementsByClassName('SignUpPageButton');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = '';
    }
    all = document.getElementsByClassName('MyProfilePageButton');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = 'none';
    }
  }
  if (isLoggedIn) {
    var all = document.getElementsByClassName('LoginPageButton');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = 'none';
    }
    all = document.getElementsByClassName('SignUpPageButton');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = 'none';
    }
    all = document.getElementsByClassName('MyProfilePageButton');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = '';
    }
  }
}

LoginButton()

