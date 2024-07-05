import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useState } from 'react';
import { User } from './UsersContainer';
import useUsers from '../hooks/useUsers';

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
});

type FormData = z.infer<typeof schema>;

interface FormDialogProps {
  initialData?: FormData;
}

export interface FormDialogHandles {
  openDialog: () => void;
  closeDialog: () => void;
  submitDialog: () => void;
}


const FormModal: ForwardRefRenderFunction<FormDialogHandles,FormDialogProps> = ({ initialData }, ref) =>{
     const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: initialData
    });

    const [open, setOpen] = useState<boolean>(false);
    const {  refetch } = useUsers();
    
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      reset({ name: '', email: '' });  
    };

    useImperativeHandle(ref, () => ({
      openDialog: handleOpen,
      closeDialog: handleClose,
      submitDialog: handleSubmit
    }));

    const insertUser = async (data: FormData) => { 
      const id = initialData ? initialData.id : Math.floor(Math.random() * 4000);
       const user: User = {
        id: id,
        name: data.name,
        email: data.email,
      }

      const route = '/users';
      const updateRoute = `${route}/${id}`;
    
      await fetch(initialData ? updateRoute : route, {
        method: initialData ? "PATCH" : "POST",
        body: JSON.stringify(user),
      })
        .then(response => {
          if(response.ok){
           return response.json();
          }})
        .then((res) => {
          console.log(res, 'res')
          refetch();
     })        
    }

    
  const updateUsers = async (user: User) => {
    const { id } = user; 
    console.log(id, 'id');

    await fetch(`/users/${id}`,  {
      method: "PATCH",
      body: JSON.stringify({name:'Lince'}),
    })
      .then(response => {

        if(response.ok){
         return response.json(); 
        }})
      .then(() => {
        refetch();
            
   })      
  }

    const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
      insertUser(data);
     
      handleClose();
    };

    useEffect(()=>{
      if (initialData) {
        reset(initialData);  
      }
    }, [reset, initialData])

    return (
        <>
    
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Formulário de Exemplo</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              label="Nome"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      </>

    )
}

const FormDialog = forwardRef(FormModal);

export default FormDialog;


