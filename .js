var Form=document.getElementById('addform')
var exp=document.getElementById('expense');
var desc=document.getElementById('description');
var cate=document.getElementById('category');
var itemlist=document.getElementById('users')
document.addEventListener("submit",addItem)
// localStorage.setItem('userexpense','expence')
// localStorage.setItem('userdescription','description')
// localStorage.setItem('usercategory','category')

function addItem(e){
    e.preventDefault();
    if(exp.value==='' || desc.value==='' || cate.value===''){
        alert('please enter fields')
    }
    else{
        let Obj={
            expense:exp.value,
            description:desc.value,
            category:cate.value
        }
axios.post("https://crudcrud.com/api/f641fb110e124d7db41a94876b833f1d/expenseData", Obj)
.then((response)=>{
    showonscreen(response.data);
    console.log(response);
})
.catch((err)=>{
    document.body.innerHTML=document.body.innerHTML+"<h4>something wrong</h4>"
    console.log(err)
})


//         let Obj_serialized=JSON.stringify(Obj);
// localStorage.setItem(Obj.description,Obj_serialized);
// let Obj_deserialized=JSON.parse(localStorage.getItem("Obj"))

    }
}


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/f641fb110e124d7db41a94876b833f1d/expenseData")
    .then((response)=>{
        console.log(response)
         for(var i=0;i<response.data.length;i++){
            showonscreen(response.data[i])
         }
    })
    .catch((error)=>{
        console.log(error);
    })
})


function showonscreen(data){
    var li=document.createElement('li');
    li.className='item';
    //console.log(`${data.expence}`)
    li.appendChild(document.createTextNode(`${data.expense}- ${data.description}`));

    var delbtn=document.createElement('button');
    delbtn.className='delete-btn';
    delbtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delbtn)

    var edibtn=document.createElement('button');
    edibtn.className='edit-btn';
    edibtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(edibtn)

    itemlist.appendChild(li)


        document.addEventListener('click',deleteitem);

        function deleteitem(e){
            if(e.target==delbtn){
                if(confirm('Are U sure?')){
                    var li=e.target.parentElement;
                    axios.get("https://crudcrud.com/api/f641fb110e124d7db41a94876b833f1d/expenseData")
                    .then((response)=>{
                        console.log(response)
                         for(var i=0;i<response.data.length;i++){
                            if(li.innerHTML.indexOf(response.data[i].description)!=-1){
                                axios.delete(`https://crudcrud.com/api/f641fb110e124d7db41a94876b833f1d/expenseData/${response.data[i]._id}`)
                                .then()
                                .catch(err=>console.log(err))
                               }

                         }
                    })
                    .catch((error)=>{
                        console.log(error);
                    })

                    //localStorage.removeItem(Obj.description);
                    itemlist.removeChild(li)
                }
            }
        }
        document.addEventListener('click',edititem);

        function edititem(e){
            if(e.target==edibtn){
                var li=e.target.parentElement;
                axios.get("https://crudcrud.com/api/f641fb110e124d7db41a94876b833f1d/expenseData")
                    .then((response)=>{
                        console.log(response)
                         for(var i=0;i<response.data.length;i++){
                            if(li.innerHTML.indexOf(response.data[i].description)!=-1){
                        //let myobj_deserialized1=JSON.parse(itemlist.getElementsByClassName('item')[i].firstChild.textContent);


                        Form.querySelector('#expense').value=response.data[i].expense
                        Form.querySelector('#description').value=response.data[i].description
                        Form.querySelector('#category').value=response.data[i].categorypro
                        //localStorage.removeItem(Obj.description);
                        axios.delete(`https://crudcrud.com/api/f641fb110e124d7db41a94876b833f1d/expenseData/${response.data[i]._id}`)
                        .then()
                        .catch(err=>console.log(err))
                            }
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })


            itemlist.removeChild(li)
        }
    }  
}
