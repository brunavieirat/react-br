import { Box, Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { BaseSyntheticEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "../types";

interface FormContentProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    handleClose: () => void;
    initialData?: FormData;
  } 

const RegisterForm: React.FC<FormContentProps> = ({register, errors, onSubmit, handleClose, initialData}) => {

    return (
        
        <>
        <Box component="form" onSubmit={onSubmit}>
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
        </>
    )
}

export default RegisterForm;