import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from './UsersContainer';
import useUsers from '../hooks/useUsers';

const schema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
});

export type FormData = z.infer<typeof schema>;

interface FormDialogProps {
  initialData?: FormData;
}

export interface FormDialogHandles {
  openDialog: () => void;
  closeDialog: () => void;
  submitDialog: () => void;
}

const FormModal: ForwardRefRenderFunction<FormDialogHandles, FormDialogProps> = ({ initialData }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { name: '', email: '' } 
  });

  const [open, setOpen] = useState<boolean>(false);
  const { refetch } = useUsers();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset(); 
  };

  useImperativeHandle(ref, () => ({
    openDialog: handleOpen,
    closeDialog: handleClose,
    submitDialog: handleSubmit(onSubmit)
  }));

  const insertOrUpdateUser = async (data: FormData) => {
    const id = initialData?.id || Math.floor(Math.random() * 4000); 
    const user: User = {
      id: id,
      name: data.name,
      email: data.email,
    };

    const route = '/users';
    const updateRoute = `${route}/${id}`;

    const response = await fetch(initialData ? updateRoute : route, {
      method: initialData ? 'PATCH' : 'POST',
      body: JSON.stringify(user),
    });

    if (response.ok) {
      refetch();
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    insertOrUpdateUser(data);
    handleClose();
  };

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('email', initialData.email);
    }
  }, [initialData, setValue]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
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
  );
};

const FormDialog = forwardRef(FormModal);

export default FormDialog;
