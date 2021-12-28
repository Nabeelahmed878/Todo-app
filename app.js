var firebaseConfig = {
    apiKey: "AIzaSyDLkJTHhbvwJyHecHlEJyu_ymI0kgShrdI",
    authDomain: "todo-app-c7736.firebaseapp.com",
    databaseURL: "https://todo-app-c7736-default-rtdb.firebaseio.com",
    projectId: "todo-app-c7736",
    storageBucket: "todo-app-c7736.appspot.com",
    messagingSenderId: "136018026515",
    appId: "1:136018026515:web:befa63233045cab367dfe6"
  };

  var app = firebase.initializeApp(firebaseConfig);




var list = document.getElementById("list");


  firebase.database().ref('todos').on('child_added',function(data){
    //   console.log(data.val())
    //   database.child(key).set(todo)

    // create li tag with text node
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)

    // create delete button
    var delBtn = document.createElement("button")
    var delText = document.createTextNode("DELETE")
    delBtn.setAttribute("class", "btn")
    delBtn.setAttribute('id',data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText)

    // create edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT")
    editBtn.appendChild(editText)
    editBtn.setAttribute("class", "btn")
    editBtn.setAttribute('id',data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")


    li.appendChild(delBtn)
    li.appendChild(editBtn)

    list.appendChild(li)

    // todo_item.value = ""
  })

function addTodo() {
    var todo_item = document.getElementById("todo-item");
    var database = firebase.database().ref('todos')
    var key = database.push().key
    var todo = {
        value: todo_item.value,
        key: key
    }

    database.child(key).set(todo)

    todo_item.value = ""
}

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function editItem(e) {
  var val = prompt("Enter updated value",e.parentNode.firstChild.nodeValue)
  var edittodo = {
      value: val,
      key: e.id
  }
  firebase.database().ref('todos').child(e.id).set(edittodo)
  e.parentNode.firstChild.nodeValue = val;
}

function deleteAll() {
    firebase.database().ref('todos').remove()   
    list.innerHTML = ""
}