
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RegisterForm from '../RegisterForm/RegisterForm';
import { FormData, schema, FormDialogHandles, FormDialogProps } from '../types';
import useUsers from '../../hooks/useUsers';


const RegisterFormContainer: ForwardRefRenderFunction<FormDialogHandles, FormDialogProps>  = ({ initialData }, ref) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { name: '', email: '' },
  });

  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 
  const { refetch } = useUsers();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
    setError(null);
  };

  useImperativeHandle(ref, () => ({
    openDialog: handleOpen,
    closeDialog: handleClose,
    submitDialog: () => handleSubmit(onSubmit)(),
  }));

  const insertOrUpdateUser = async (data: FormData) => {
    try {
    const id = initialData?.id || Math.floor(Math.random() * 4000);
    const user = { id, name: data.name, email: data.email };
    const route = '/users';
    const updateRoute = `${route}/${id}`;

    const response = await fetch(initialData ? updateRoute : route, {
      method: initialData ? 'PATCH' : 'POST',
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to submit user data'); 
    }

      refetch();
      handleClose();
  } catch (error) {
    setError('Erro ao salvar usuário'); 
    console.error('Erro ao salvar usuário:', error); 
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
      <DialogTitle>{initialData ? 'Editar Usuário' : 'Adicionar Usuário'}</DialogTitle>
      <DialogContent>
        <RegisterForm
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          handleClose={handleClose}
          initialData={initialData}
        />
      </DialogContent>

    </Dialog>
  );
};

const RegisterFormModal = forwardRef(RegisterFormContainer);
export default RegisterFormModal;