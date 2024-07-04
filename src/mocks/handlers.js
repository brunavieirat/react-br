import { http, HttpResponse } from 'msw'
 
let allPosts = [
  {
    id:'12132',
    name: 'Charlotte'
  },
  {
    id: 2323,
    name: 'Marley'
  }
];


console.log(allPosts)
export const handlers = [
    http.get('/posts', () => {
        return HttpResponse.json(allPosts)
        
      }),
 
      http.post('/posts', async ({ request }) => {
        const newPost = await request.json()
     
        allPosts.push(newPost)
     
        return HttpResponse.json(newPost, { status: 201 })
      }),
      http.delete('/posts/:id', async({ params }) => {
        const { id } = params;
        const deletedPost = allPosts.filter((item) => item.id != id );

        allPosts = deletedPost;
     
         return new HttpResponse(id, { status: 200 })
        }
     
      
      ),
      http.patch('/posts/:id', async ({ request, params, }) => {
        const { name } = await request.json();
        const {id} = params;


        const newPosts = allPosts.map((item) => {
          if(item.id == id){
            console.log('igual')
            return {...item,
              name: name
            }
          }else{
            return item
          }
        });
        console.log(newPosts, 'teste')

        allPosts = newPosts

        return HttpResponse.json({id: id, name: name}, { status: 201 })
      }),
  ]