let write = document.getElementById("todo");
        let todoList = document.getElementById("todo-list");

        write.addEventListener("keyup",function(e){
            if(e.key == "Enter"){
                addTodo(this.value);
                this.value = ''
            }
        })

        function addTodo(val){
            let list = document.createElement("li");
            list.innerHTML =`${val}`;
            todoList.appendChild(list);
            console.log(val);

            list.addEventListener('click',function(){
                this.classList.toggle('done')
            })
        }