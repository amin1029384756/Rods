// dark mode



document.querySelector('.loaderContent').style.display='none';
// preloader
var loaders;
function loader(){
    loaders=setTimeout(showPage,1500)
}
function showPage(){
    document.querySelector('.loading').style.display='none';
    document.querySelector('.loaderContent').style.display='block';
}
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
        apiKey: "AIzaSyCk41TQ5DousgWVn1lPOHx5TpL-VNQhNSU",
        authDomain: "rods-61383.firebaseapp.com",
        projectId: "rods-61383",
        storageBucket: "rods-61383.appspot.com",
        messagingSenderId: "275524116479",
        appId: "1:275524116479:web:a8866de519ab1c8a5cd1ca",
        measurementId: "G-DW7QNVCR8R"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  

const btnLogin=document.getElementById('loginBtn');
const btnLogOut=document.getElementById('logoutBtn');


        document.getElementById('addPostBtn').addEventListener('click', function(e){
          var title= document.getElementById('title').value;
          var message= document.getElementById('message').value;
          var author=document.getElementById('author').value;
        
          createPost(title,message,author);
          form.reset();
          e.preventDefault();
      }); 

        function createPost(name,description,creator){
          var article={
              title:name,
              description:description,
              author:creator
          }
          let db=firebase.firestore().collection('articles/');
          db.add(article)
          .then(function(){
              swal('Saved')
              document.getElementById('cardSection').innerHTML=' ';
              readPost();
          })
          
      }
      var count=0;
      function likeIt(x){
        x.classList.add('red')
        // count++
        // document.querySelector('.counts').innerHTML=`${count} Likes`
      }

      function readPost(){
        
        
        firebase.firestore()
        .collection('articles')
        .onSnapshot(function(
            snapshot){
            document.getElementById('cardSection').innerHTML=' ';
            snapshot.forEach(function(post){
                document.getElementById('cardSection').innerHTML+=`
                <div class="card m-4 p-3 shadow "  >
                <div class="card-title text-center">
                    <h3> ${post.data().title}</h3>
                </div>
                <div class="card-body">
                    <h5> ${post.data().description} </h5>
                </div>
                <div class='card-title text-right p-3'>
                    <h5 > <i>  By  ${post.data().author} </i>  </h5>
                    <span> <i onclick='likeIt(this)'  class="fas fa-heart ml-4" > </i><b class='counts'></b>  <span>
                </div>
        </div>
             
                `
            });
        });
   
    }
    readPost()

    function reset(){
       document.getElementById('firstSection').innerHTML=`
   
       <form id="form">
       <div class="form-group m-2 p-1">
           <label for="namse"> Title </label>
           <input type="text" name="name" id="title" class='form-control identity width' >
       </div> 
       <div class="form-group m-2 p-1 ">
           <label> Content </label>
           <textarea name="text" id='message' class='form-control identity width' cols="30" rows="10">  </textarea>
       </div>
       <div class="form-group m-2 p-1">
           <label for="namse">  Display Name </label>
           <input type="text" name="name" id="author" class='form-control identity width' >
       </div> 
 
        <div class="text-center">
           <button id='addPostBtn'   class='btn btn-secondary button1  m-3' > Post </button> 
        </div>
   </form>     
        
        `;
        
        document.getElementById('addPostBtn').addEventListener('click', function(e){
          var title= document.getElementById('title').value;
          var message= document.getElementById('message').value;
          var author=document.getElementById('author').value;
        
          createPost(title,message,author);
          form.reset();
          e.preventDefault();
      }); 
    }
     setInterval(readPost, 10);  
