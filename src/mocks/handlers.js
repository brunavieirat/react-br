import { http, HttpResponse } from "msw";

 
let allUsers = [
  {
    id:'12132',
    name: 'Amanda',
    email: 'amanda@hotmail.com'
  },
  {
    id: 2323,
    name: 'Bruna',
    email: 'bruna@hotmail.com'
  },
  {
    id: 323,
    name: 'Douglas',
    email: 'douglas@hotmail.com'
  }
];


export const handlers = [
    http.get('/users', () => {
        return HttpResponse.json(allUsers)
        
      }),
 
      http.post('/users', async ({ request }) => {
        const newUser = await request.json()
     
        allUsers.push(newUser)
     
        return HttpResponse.json(newUser, { status: 201 })
      }),
      http.delete('/users/:id', async({ params }) => {
        const { id } = params;
        const deletedUser = allUsers.filter((item) => item.id != id );

        allUsers = deletedUser;
     
         return new HttpResponse(id, { status: 200 })
        }
      ),
      http.patch('/users/:id', async ({ request, params, }) => {
        const { name, email } = await request.json();
        const { id } = params;


        const newUsers = allUsers.map((item) => {
          if(item.id == id){
            return {...item,
              name: name,
              email: email
            }
          }else{
            return item
          }
        });

        allUsers = newUsers

        return HttpResponse.json({id: id, name: name}, { status: 201 })
      }),
  ]