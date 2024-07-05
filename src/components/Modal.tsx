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

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  // idade: z.number().int().positive('Idade deve ser um número positivo')
});

type FormData = z.infer<typeof schema>;


const FormModal: React.FC<{open: boolean, handleClose: () => void}> = ({open, handleClose}: {open: boolean, handleClose: () => void}) =>{
     const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<FormData>({
      resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
      handleClose();
    };

    return (
        <>
    
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Formulário de Exemplo</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              label="Nome"
              {...register('nome')}
              error={!!errors.nome}
              helperText={errors.nome ? errors.nome.message : ''}
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
            <TextField
              label="Idade"
              type="number"
              {...register('idade', { valueAsNumber: true })}
              error={!!errors.idade}
              helperText={errors.idade ? errors.idade.message : ''}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      </>

    )
}

export default FormModal

